export default class SyntaxHighlighter {

    constructor() {
        // Initialize the syntax highlighter when instantiated
        SyntaxHighlighter.init();
    }

    // CSS classes used for each HTML token type
    static class = {
        tag: "highlight-tag",                // The angle brackets < and > around tags
        tagName: "highlight-tag-name",       // The name of the HTML tags
        attributeName: "highlight-attribute-name", // Attribute names
        attributeValue: "highlight-attribute-value", // Attribute values (inside quotes)
        comment: "highlight-comment",        // HTML comments
        equalSign: "highlight-equal-sign",   // Equal sign (=) in attributes
        text: "highlight-text",              // Plain text between tags
    };

    // Initialize highlighting on all elements with data-js="code"
    static init() {
        document.querySelectorAll('[data-js="code"]').forEach(element => {
            SyntaxHighlighter.highlight(element);
        });
        SyntaxHighlighter.wrapWithPreCode();
    }

    // Wrap the inner HTML of each [data-js="code"] element with <pre><code> ... </code></pre>
    static wrapWithPreCode() {
        document.querySelectorAll('[data-js="code"]').forEach(element => {
            const content = element.innerHTML;
            element.innerHTML = `<pre><code>${content}</code></pre>`;
        });
    }

    // Apply syntax highlighting to a given element
    static highlight(element) {
        let html = element.innerHTML;
        html = SyntaxHighlighter.dedentHTML(html);
        // Step 1: Escape HTML special characters to prevent interpretation
        html = SyntaxHighlighter.escapeHTML(html);
        // Step 2: Highlight HTML comments
        html = SyntaxHighlighter.colorComments(html);
        // Step 3: Highlight plain text
        html = SyntaxHighlighter.colorText(html);
        // Step 4: Highlight tags, tag names, and attributes
        html = SyntaxHighlighter.colorTags(html);
        // Replace the original content with the highlighted version
        element.innerHTML = html;
    }

    // Remove leading and trailing whitespace from the text
    static dedentHTML(text) {
        const cleanedText = String(text)
            .replace(/^\s*\n/, "")
            .replace(/\s+$/, "");

        const lines = cleanedText.split("\n");

        const nonEmptyLines = lines.filter(line => line.trim().length > 0);
        if (nonEmptyLines.length === 0) return "";

        const indentSizes = nonEmptyLines.map(line => {
            const match = line.match(/^[\t ]*/);
            return match ? match[0].length : 0;
        });
        const smallestIndent = Math.min(...indentSizes);

        return lines
            .map(line => line.replace(new RegExp(`^[\\t ]{0,${smallestIndent}}`), ""))
            .join("\n");
    }

    // Escape HTML entities (< and >) to prevent parsing
    static escapeHTML(text) {
        return text
            // .replace(/&/g, "&amp;")  // Uncomment if needed, but beware of double escaping
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    // Highlight HTML comments
    static colorComments(text) {
        return text.replace(
            /(&lt;!--[\s\S]*?--&gt;)/g,
            match => `<span class="${SyntaxHighlighter.class.comment}">${match}</span>`
        );
    }

    // Highlight HTML tags, tag names, and attributes
    static colorTags(text) {
        return text.replace(/(&lt;\/?)([a-zA-Z0-9\-]+)([\s\S]*?)(\/?)(&gt;)/g,
            (match, tagOpeningBracket, tagName, tagAttributes, selfClosingSlash, tagClosingBracket) => {
                const coloredOpeningBracket = `<span class="${SyntaxHighlighter.class.tag}">${tagOpeningBracket}</span>`;
                const coloredTagName = `<span class="${SyntaxHighlighter.class.tagName}">${tagName}</span>`;
                const coloredAttributes = SyntaxHighlighter.colorAttributes(tagAttributes);
                const coloredSelfClosingSlash = selfClosingSlash ? `<span class="${SyntaxHighlighter.class.tag}">${selfClosingSlash}</span>` : '';
                const coloredClosingBracket = `<span class="${SyntaxHighlighter.class.tag}">${tagClosingBracket}</span>`;
                return (coloredOpeningBracket + coloredTagName + coloredAttributes + coloredSelfClosingSlash + coloredClosingBracket);
            }
        );
    }

    // Highlight HTML attributes (name, equal sign, and value)
    static colorAttributes(attrs) {
        return attrs.replace(
            /(\s+)([a-zA-Z\-:]+)(=)("([^"]*)"|'([^']*)')?/g,
            (match, spaces, attrName, equalSign, quotedValue) => {
                let colored = spaces;
                colored += `<span class="${SyntaxHighlighter.class.attributeName}">${attrName}</span>`;
                colored += `<span class="${SyntaxHighlighter.class.equalSign}">${equalSign}</span>`;
                if (quotedValue) {colored += `<span class="${SyntaxHighlighter.class.attributeValue}">${quotedValue}</span>`;}
                return colored;
            }
        );
    }

    // Highlight text content between HTML tags
    static colorText(text) {
        return text.replace(
            /(&gt;)([^&]+?)(&lt;)/g,
            (match, tagClosingBracket, textContent, tagOpeningBracket) => {
                if (!textContent.trim()) return match;
                const isInsideComment = tagOpeningBracket === '&lt;' && text.substr(text.indexOf(match) + match.length - 4, 7) === '&lt;!--';
                if (isInsideComment) return match;
                return `${tagClosingBracket}<span class="${SyntaxHighlighter.class.text}">${textContent}</span>${tagOpeningBracket}`;
            }
        );
    }

}
