# Markdown Previewer

## Problem

Build a live Markdown previewer with a split-pane layout. The left pane is a textarea editor; the right pane renders the parsed HTML in real time. Use the marked.js CDN library for Markdown parsing.

## Requirements

- Split-pane layout: left = editor textarea, right = rendered preview
- Uses marked.js from CDN for parsing: `https://cdn.jsdelivr.net/npm/marked/marked.min.js`
- Live update as the user types — no submit button needed
- Default content: a sample Markdown document demonstrating headings, bold, italic, inline code, code blocks, unordered lists, and links
- Toolbar buttons above the editor: Bold (`**text**`), Italic (`*text*`), Code (`` `text` ``), and Link (`[text](url)`) — each inserts the syntax at the cursor position in the textarea

## Edge Cases

- Use DOMPurify CDN (`https://cdn.jsdelivr.net/npm/dompurify/dist/purify.min.js`) to sanitize HTML output before inserting it into the DOM, preventing XSS
- Sync scroll: scrolling the editor scrolls the preview proportionally (ratio of scrollTop / scrollHeight)
- Handle empty input gracefully — preview area shows nothing (blank), not an error
- Toolbar inserts wrap selected text if text is selected, or insert a placeholder if no selection
