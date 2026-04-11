import { createHighlighter } from 'shiki';

// Shikiハイライターのシングルトン
let highlighterPromise: ReturnType<typeof createHighlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-dark'],
      langs: [
        'javascript', 'typescript', 'html', 'css', 'json',
        'bash', 'shell', 'markdown', 'yaml', 'python',
        'jsx', 'tsx', 'sql', 'graphql', 'diff',
        'go', 'rust', 'java', 'csharp', 'php',
      ],
    });
  }
  return highlighterPromise;
}

/**
 * microCMSのコードブロックにシンタックスハイライトを適用
 *
 * microCMSのリッチエディタは以下の形式で出力する:
 * - 言語・ファイル名あり: <div data-filename="xxx"><pre><code class="language-xxx">コード</code></pre></div>
 * - 言語のみ: <pre><code class="language-xxx">コード</code></pre>
 * - 指定なし: <pre><code>コード</code></pre>
 */
async function highlightCodeBlocks(html: string): Promise<string> {
  const highlighter = await getHighlighter();

  // パターン1: <div data-filename="xxx"> で囲まれたコードブロック
  const wrappedRegex = /<div data-filename="([^"]*)">\s*<pre><code(?:\s+class="language-([^"]*)")?>([\s\S]*?)<\/code><\/pre>\s*<\/div>/g;
  // パターン2: 単体の <pre><code> コードブロック
  const standaloneRegex = /<pre><code(?:\s+class="language-([^"]*)")?>([\s\S]*?)<\/code><\/pre>/g;

  let result = html;

  // パターン1を先に処理（パターン2に部分一致するのを避けるため）
  const wrappedMatches = [...result.matchAll(wrappedRegex)];
  for (const match of wrappedMatches) {
    const filename = match[1];
    const langAttr = match[2];
    const rawCode = decodeHtmlEntities(match[3]);
    const lang = langAttr || detectLanguage(rawCode);

    try {
      const highlighted = highlighter.codeToHtml(rawCode, {
        lang,
        theme: 'github-dark',
      });
      const withFilename = `<div class="code-block-wrapper">${filename ? `<div class="code-block-filename">${escapeHtml(filename)}</div>` : ''}${highlighted}</div>`;
      result = result.replace(match[0], () => withFilename);
    } catch {
      // 未対応言語の場合はそのまま残す
    }
  }

  // パターン2を処理（パターン1で置換されなかった残り）
  const standaloneMatches = [...result.matchAll(standaloneRegex)];
  for (const match of standaloneMatches) {
    const langAttr = match[1];
    const rawCode = decodeHtmlEntities(match[2]);
    const lang = langAttr || detectLanguage(rawCode);

    try {
      const highlighted = highlighter.codeToHtml(rawCode, {
        lang,
        theme: 'github-dark',
      });
      result = result.replace(match[0], () => highlighted);
    } catch {
      // 未対応言語の場合はそのまま残す
    }
  }

  return result;
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trimEnd();
}

/**
 * コード内容から言語を推測
 */
function detectLanguage(code: string): string {
  const firstLine = code.split('\n')[0].trim();

  // よくあるパターンで推測
  if (firstLine.startsWith('<!DOCTYPE') || firstLine.startsWith('<html')) return 'html';
  if (firstLine.startsWith('{') || firstLine.startsWith('[')) return 'json';
  if (firstLine.startsWith('---')) return 'yaml';
  if (firstLine.startsWith('#!') && firstLine.includes('bash')) return 'bash';
  if (firstLine.startsWith('#!') && firstLine.includes('python')) return 'python';
  if (firstLine.startsWith('$') || firstLine.startsWith('npm ') || firstLine.startsWith('npx ')) return 'bash';

  // キーワードベースの推測
  if (/^(import|export|const|let|var|function|class|interface|type)\s/.test(firstLine)) {
    if (code.includes(': string') || code.includes(': number') || code.includes('<T>') || code.includes('interface ')) {
      return 'typescript';
    }
    return 'javascript';
  }
  if (/^(def |class |from |import )/.test(firstLine)) return 'python';
  if (/^(package |func |import \()/.test(firstLine)) return 'go';
  if (/^(fn |use |let mut |pub )/.test(firstLine)) return 'rust';
  if (/^(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER)\s/i.test(firstLine)) return 'sql';
  if (firstLine.startsWith('<') && firstLine.endsWith('>')) return 'html';
  if (/^[.#@]/.test(firstLine) || (code.includes('{') && code.includes(':') && code.includes(';'))) return 'css';

  return 'text';
}

/**
 * 見出しにid属性を付与する
 * microCMSのリッチエディタがidを付けない場合でも目次とアンカーリンクが動作するようにする
 */
function addHeadingIds(html: string): string {
  let counter = 0;
  return html.replace(/<h([2-3])([^>]*)>([\s\S]*?)<\/h[2-3]>/g, (match, level, attrs, content) => {
    // 既にid属性がある場合はそのまま返す
    if (/\bid="[^"]*"/.test(attrs)) return match;

    const slug = `heading-${counter++}`;
    return `<h${level}${attrs} id="${slug}">${content}</h${level}>`;
  });
}

/**
 * URLが安全か検証する（http/httpsのみ許可）
 */
function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * 単独行のリンクをカード表示に変換
 *
 * microCMSのリッチエディタでURLだけの段落は以下の形式になる:
 * <p><a href="https://...">https://...</a></p>
 *
 * これをOGP情報付きのリンクカードに変換する
 */
async function transformLinkCards(html: string): Promise<string> {
  // <p>内にリンクだけがある場合を検出
  const linkOnlyRegex = /<p><a\s+href="(https?:\/\/[^"]+)"[^>]*>\1<\/a><\/p>/g;

  const matches = [...html.matchAll(linkOnlyRegex)];
  if (matches.length === 0) return html;

  let result = html;
  for (const match of matches) {
    const url = match[1];
    try {
      const ogp = await fetchOgp(url);
      const card = buildLinkCard(url, ogp);
      result = result.replace(match[0], () => card);
    } catch {
      // OGP取得に失敗した場合はそのまま残す
    }
  }

  return result;
}

interface OgpData {
  title: string;
  description: string;
  image: string;
  favicon: string;
}

/**
 * URLからOGP情報を取得
 */
async function fetchOgp(url: string): Promise<OgpData> {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'bot' },
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch OGP: ${response.status}`);
  }
  const html = await response.text();

  const getMetaContent = (property: string): string => {
    const regex = new RegExp(`<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']*)["']`, 'i');
    const altRegex = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${property}["']`, 'i');
    return regex.exec(html)?.[1] || altRegex.exec(html)?.[1] || '';
  };

  const title = decodeHtmlEntities(
    getMetaContent('og:title')
    || html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]
    || url
  );

  const description = decodeHtmlEntities(
    getMetaContent('og:description')
    || getMetaContent('description')
    || ''
  );

  const image = getMetaContent('og:image') || '';
  const favicon = `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=32`;

  return { title, description, image, favicon };
}

/**
 * 既存の remark-link-card と同じHTML構造でカードを生成
 */
function buildLinkCard(url: string, ogp: OgpData): string {
  const hostname = new URL(url).hostname;
  const escapedTitle = escapeHtml(ogp.title);
  const escapedDesc = escapeHtml(ogp.description);
  const safeImage = ogp.image && isSafeUrl(ogp.image) ? escapeHtml(ogp.image) : '';

  return `<a class="rlc-container" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">
  <div class="rlc-info">
    <div class="rlc-title">${escapedTitle}</div>
    <div class="rlc-description">${escapedDesc}</div>
    <div class="rlc-url-container">
      <img class="rlc-favicon" src="${escapeHtml(ogp.favicon)}" alt="" width="16" height="16" />
      <span class="rlc-url">${escapeHtml(hostname)}</span>
    </div>
  </div>
  ${safeImage ? `<div class="rlc-image-container"><img class="rlc-image" src="${safeImage}" alt="" /></div>` : ''}
</a>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * 記事HTMLに全ての変換処理を適用
 */
export async function transformContent(html: string): Promise<string> {
  let result = html;
  result = addHeadingIds(result);
  result = await highlightCodeBlocks(result);
  result = await transformLinkCards(result);
  return result;
}
