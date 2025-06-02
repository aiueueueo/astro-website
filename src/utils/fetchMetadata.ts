export interface LinkMetadata {
  title: string;
  description: string;
  image?: string;
  siteName?: string;
  url: string;
}

export async function fetchLinkMetadata(url: string): Promise<LinkMetadata | null> {
  try {
    // 本番環境では外部APIを使用するか、事前にメタデータを取得
    // 開発環境では簡易的な実装
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LinkCardBot/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    return parseMetadata(html, url);
  } catch (error) {
    console.error('Failed to fetch metadata:', error);
    return null;
  }
}

function parseMetadata(html: string, url: string): LinkMetadata {
  // HTMLから主要なメタタグを抽出
  const titleMatch = html.match(/<meta property="og:title" content="([^"]*)"/) || 
                     html.match(/<meta name="twitter:title" content="([^"]*)"/) ||
                     html.match(/<title>([^<]*)<\/title>/);
  
  const descMatch = html.match(/<meta property="og:description" content="([^"]*)"/) ||
                    html.match(/<meta name="twitter:description" content="([^"]*)"/) ||
                    html.match(/<meta name="description" content="([^"]*)"/);
  
  const imageMatch = html.match(/<meta property="og:image" content="([^"]*)"/) ||
                     html.match(/<meta name="twitter:image" content="([^"]*)"/);
  
  const siteNameMatch = html.match(/<meta property="og:site_name" content="([^"]*)"/);

  return {
    title: titleMatch ? titleMatch[1] : extractDomainFromUrl(url),
    description: descMatch ? descMatch[1] : '',
    image: imageMatch ? imageMatch[1] : undefined,
    siteName: siteNameMatch ? siteNameMatch[1] : extractDomainFromUrl(url),
    url: url,
  };
}

function extractDomainFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return url;
  }
}

// 事前定義されたサイトのメタデータ（CORSやパフォーマンス対策）
export const PREDEFINED_METADATA: Record<string, LinkMetadata> = {
  'https://astro.build/': {
    title: 'Astro',
    description: 'The web framework for content-driven websites. Astro powers the world\'s fastest websites, client-side web apps, dynamic API endpoints, and everything in-between.',
    image: 'https://astro.build/og/image.jpg',
    siteName: 'Astro',
    url: 'https://astro.build/'
  },
  'https://react.dev/': {
    title: 'React',
    description: 'The library for web and native user interfaces',
    image: 'https://react.dev/images/opengraph-logo.png',
    siteName: 'React',
    url: 'https://react.dev/'
  },
  'https://nextjs.org/': {
    title: 'Next.js',
    description: 'The React Framework for the Web. Used by some of the world\'s largest companies, Next.js enables you to create full-stack Web applications by extending the latest React features.',
    image: 'https://nextjs.org/og-image.png',
    siteName: 'Next.js',
    url: 'https://nextjs.org/'
  },
  'https://www.typescriptlang.org/': {
    title: 'TypeScript',
    description: 'TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.',
    image: 'https://www.typescriptlang.org/images/opengraph-logo.png',
    siteName: 'TypeScript',
    url: 'https://www.typescriptlang.org/'
  },
  'https://web.dev/': {
    title: 'web.dev',
    description: 'Get the web\'s modern capabilities on your own sites and apps with useful guidance and analysis from web.dev.',
    image: 'https://web.dev/images/social.png',
    siteName: 'web.dev',
    url: 'https://web.dev/'
  },
  'https://github.com/': {
    title: 'GitHub',
    description: 'GitHub is where over 100 million developers shape the future of software, together.',
    image: 'https://github.githubassets.com/images/modules/site/social-cards/github-social.png',
    siteName: 'GitHub',
    url: 'https://github.com/'
  }
};

export function getMetadata(url: string): LinkMetadata | null {
  // 事前定義されたメタデータから検索
  const predefined = PREDEFINED_METADATA[url];
  if (predefined) {
    return predefined;
  }

  // ドメインベースでの部分一致検索
  for (const [key, metadata] of Object.entries(PREDEFINED_METADATA)) {
    try {
      const keyDomain = new URL(key).hostname;
      const urlDomain = new URL(url).hostname;
      if (keyDomain === urlDomain) {
        return { ...metadata, url };
      }
    } catch {
      continue;
    }
  }

  return null;
}