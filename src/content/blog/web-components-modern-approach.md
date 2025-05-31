---
title: 'Web Components でフレームワークに依存しないコンポーネント開発'
description: 'Web Components を使用してフレームワークに依存しない再利用可能なコンポーネントを作成する方法を解説します。'
pubDate: 2024-01-20
heroImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop'
tags: ['Web Components', 'JavaScript', 'Frontend']
draft: false
---

# Web Components でフレームワークに依存しないコンポーネント開発

Web Components は、カスタム要素を作成するためのWeb標準技術です。フレームワークに依存せず、再利用可能なコンポーネントを作成できます。

## 基本的なカスタム要素

```javascript
class MyButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback() {
    this.render();
    this.addEventListeners();
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        button {
          background: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        
        button:hover {
          background: #0056b3;
        }
        
        button:disabled {
          background: #6c757d;
          cursor: not-allowed;
        }
      </style>
      <button>
        <slot></slot>
      </button>
    `;
  }
  
  addEventListeners() {
    const button = this.shadowRoot.querySelector('button');
    button.addEventListener('click', (e) => {
      this.dispatchEvent(new CustomEvent('my-click', {
        detail: { originalEvent: e },
        bubbles: true
      }));
    });
  }
  
  static get observedAttributes() {
    return ['disabled'];
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'disabled') {
      const button = this.shadowRoot.querySelector('button');
      if (button) {
        button.disabled = newValue !== null;
      }
    }
  }
}

customElements.define('my-button', MyButton);
```

## プロパティとメソッドを持つコンポーネント

```javascript
class CounterComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._count = 0;
  }
  
  get count() {
    return this._count;
  }
  
  set count(value) {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      this._count = numValue;
      this.updateDisplay();
    }
  }
  
  connectedCallback() {
    this.render();
    this.addEventListeners();
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          text-align: center;
          font-family: Arial, sans-serif;
        }
        
        .counter {
          font-size: 2em;
          margin: 10px 0;
          color: #333;
        }
        
        button {
          margin: 0 5px;
          padding: 8px 16px;
          font-size: 16px;
          border: 1px solid #007bff;
          background: white;
          color: #007bff;
          border-radius: 4px;
          cursor: pointer;
        }
        
        button:hover {
          background: #007bff;
          color: white;
        }
      </style>
      <div>
        <div class="counter">${this._count}</div>
        <button id="decrement">-</button>
        <button id="increment">+</button>
        <button id="reset">Reset</button>
      </div>
    `;
  }
  
  addEventListeners() {
    this.shadowRoot.getElementById('increment').addEventListener('click', () => {
      this.increment();
    });
    
    this.shadowRoot.getElementById('decrement').addEventListener('click', () => {
      this.decrement();
    });
    
    this.shadowRoot.getElementById('reset').addEventListener('click', () => {
      this.reset();
    });
  }
  
  increment() {
    this.count = this._count + 1;
    this.dispatchEvent(new CustomEvent('count-changed', {
      detail: { count: this._count }
    }));
  }
  
  decrement() {
    this.count = this._count - 1;
    this.dispatchEvent(new CustomEvent('count-changed', {
      detail: { count: this._count }
    }));
  }
  
  reset() {
    this.count = 0;
    this.dispatchEvent(new CustomEvent('count-changed', {
      detail: { count: this._count }
    }));
  }
  
  updateDisplay() {
    const display = this.shadowRoot.querySelector('.counter');
    if (display) {
      display.textContent = this._count;
    }
  }
}

customElements.define('counter-component', CounterComponent);
```

## 使用例

```html
<!DOCTYPE html>
<html>
<head>
  <title>Web Components Example</title>
</head>
<body>
  <h1>Web Components Demo</h1>
  
  <my-button>Click me!</my-button>
  <my-button disabled>Disabled button</my-button>
  
  <counter-component></counter-component>
  
  <script>
    // イベントリスナーの追加
    document.querySelector('my-button').addEventListener('my-click', (e) => {
      console.log('Button clicked!', e.detail);
    });
    
    document.querySelector('counter-component').addEventListener('count-changed', (e) => {
      console.log('Count changed to:', e.detail.count);
    });
  </script>
</body>
</html>
```

Web Components により、どのフレームワークでも使用できる標準的なコンポーネントを作成できます。