# Highlighter

> 🎨 Lightweight JavaScript syntax highlighter for HTML code.

---

## 🚀 Overview

`Highlighter` is a pure JavaScript utility that adds syntax highlighting to HTML code blocks using simple CSS classes.  
It’s dependency-free, fast, and works directly in the browser — ideal for lightweight documentation or live code previews.

---

## 🧠 Features

- 💡 No dependencies (vanilla JS only)
- 🧱 Highlights HTML tags, attributes, values, and comments
- 🎨 Customizable via CSS classes
- ⚙️ Automatically wraps content with `<pre><code>` for proper formatting
- 🧩 Declarative usage with `data-js="code"` attributes

---

## 💡 Example Usage

```html
<!-- Example HTML -->
<div data-js="code">
  <div class="box" id="main">
    <!-- Example comment -->
    <p>Hello <strong>world</strong></p>
  </div>
</div>

<script type="module">
  import Highlighter from './src/highlighter.js';
  new Highlighter();
</script>
```

---

## 🎨 Default CSS Classes

| Token Type | CSS Class | Description |
|-------------|------------|--------------|
| Tag brackets | `.highlight-tag` | The `<` and `>` around HTML tags |
| Tag name | `.highlight-tag-name` | The name of the tag (e.g., `div`, `span`) |
| Attribute name | `.highlight-attribute-name` | The name of an attribute |
| Attribute value | `.highlight-attribute-value` | The quoted value of an attribute |
| Equal sign | `.highlight-equal-sign` | The `=` between attribute and value |
| Comment | `.highlight-comment` | HTML comments (`<!-- ... -->`) |
| Text | `.highlight-text` | Plain text between tags |

---

## 🧩 Initialization

You only need to instantiate it once:

```js
import Highlighter from './src/highlighter.js';
new Highlighter();
```

This automatically scans the DOM for `[data-js="code"]` elements and applies syntax highlighting.

---

## ⚙️ Methods Overview

| Method | Type | Description |
|--------|------|-------------|
| `constructor()` | Instance | Initializes the highlighter and triggers `init()` |
| `static init()` | Static | Finds `[data-js="code"]` elements and highlights them |
| `static wrapWithPreCode()` | Static | Wraps content inside `<pre><code>` |
| `static highlight(element)` | Static | Applies highlighting to the given element |
| `static escapeHTML(text)` | Static | Escapes HTML entities to avoid parsing |
| `static colorComments(text)` | Static | Highlights HTML comments |
| `static colorTags(text)` | Static | Highlights HTML tags, attributes, and brackets |
| `static colorAttributes(attrs)` | Static | Highlights HTML attribute names, values, and equal signs |
| `static colorText(text)` | Static | Highlights visible text between tags |

---

## 🧪 Browser Support

✅ Works in all modern browsers (Chrome, Firefox, Edge, Safari).  
⚠️ For legacy browsers, a `fetch` or `classList` polyfill may be required.

---

## 📜 License

MIT License © Laurent Lassallette

---
