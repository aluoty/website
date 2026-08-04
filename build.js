const fs = require('fs');
const path = require('path');
const { Marked } = require('marked');
const hljs = require('highlight.js');

const ROOT = __dirname;
const ARTICLES_DIR = path.join(ROOT, 'articles');
const CSS_DIR = path.join(ROOT, 'css');

const marked = new Marked({
    gfm: true,
    breaks: false,
    renderer: {
        code({ text, lang }) {
            const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
            const value = hljs.highlight(text, { language }).value;
            return `<pre><code class="hljs language-${language}">${value}</code></pre>`;
        },
    },
});

function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (c) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    }[c]));
}

function titleFrom(body) {
    const match = body.match(/<h1[^>]*>(.*?)<\/h1>/);
    if (!match) return null;
    return match[1].replace(/<[^>]+>/g, '').trim();
}

function renderPage({ title, body }) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(title)} - Alexander Luo</title>
    <link rel="icon" type="image/svg+xml" href="../favicon.svg">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/hljs-github-dark.css">
</head>
<body>

    <nav class="navbar">
        <a href="../index.html" class="logo">Alexander Luo</a>

        <ul class="nav-links">
            <li><a href="../index.html">Home</a></li>
            <li><a href="../projects.html">Projects</a></li>
            <li><a href="../articles.html">Articles</a></li>
        </ul>
    </nav>

    <main>
        <article class="markdown-body">
${body}
        </article>
    </main>

</body>
</html>
`;
}

function copyHighlightTheme() {
    const src = require.resolve('highlight.js/styles/github-dark.css');
    const dest = path.join(CSS_DIR, 'hljs-github-dark.css');
    fs.mkdirSync(CSS_DIR, { recursive: true });
    fs.copyFileSync(src, dest);
    console.log(`theme -> ${path.relative(ROOT, dest)}`);
}

function build() {
    copyHighlightTheme();

    const files = fs
        .readdirSync(ARTICLES_DIR)
        .filter((f) => f.endsWith('.md'))
        .sort();

    for (const file of files) {
        const source = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf8');
        const body = marked.parse(source);
        const title = titleFrom(body) || file.replace(/\.md$/, '');
        const output = path.join(ARTICLES_DIR, file.replace(/\.md$/, '.html'));
        fs.writeFileSync(output, renderPage({ title, body }));
        console.log(`built  -> ${path.relative(ROOT, output)}`);
    }

    console.log(`done. (${files.length} article(s))`);
}

build();
