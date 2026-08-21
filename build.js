const fs = require('fs');
const path = require('path');
const { Marked } = require('marked');
const hljs = require('highlight.js');

const ROOT = __dirname;
const ARTICLES_DIR = path.join(ROOT, 'articles');
const CSS_DIR = path.join(ROOT, 'css');

// Map common fence tags to grammars highlight.js actually registers.
const LANGUAGE_ALIASES = {
    asm: 'x86asm',
    assembly: 'x86asm',
    'x86': 'x86asm',
    'arm': 'arm',
    arm64: 'arm',
    racket: 'scheme',
    elisp: 'lisp',
    'emacs-lisp': 'lisp',
    emacs: 'lisp',
    riscv: 'riscv',
    riscv32: 'riscv',
    riscv64: 'riscv',
    'risc-v': 'riscv',
    'risc-v32': 'riscv',
    'risc-v64': 'riscv',
};

// highlight.js ships no RISC-V grammar — register a compact one.
function riscvGrammar(hljs) {
    const INSTRUCTIONS = [
        // base integer (RV32I/RV64I)
        'lui auipc jal jalr beq bne blt bge bltu bgeu lb lh lw lbu lhu sb sh sw addi slti sltiu xori ori andi slli srli srai add sub slt sltu xor or and fence ecall ebreak',
        // multiplication (M) & division
        'mul mulh mulhsu mulhu div divu rem remu',
        // pseudo-instructions (common)
        'nop li la lla mv not neg negw seqz snez sltz sgtz beqz bnez blez bgez bltz bgtz bgt bgtu ble bleu bgeu j jr jalr ret call tail',
    ].join(' ');

    const REGISTERS = '\\b(?:x[0-9]|x1[0-9]|x2[0-9]|x3[0-1]|zero|ra|sp|gp|tp|fp|s[0-9]|s1[0-1]|t[0-6]|a[0-7])\\b';

    return {
        name: 'RISC-V Assembly',
        aliases: ['risc-v'],
        case_insensitive: true,
        keywords: INSTRUCTIONS,
        contains: [
            hljs.COMMENT('#', '$'),
            hljs.COMMENT('//', '$'),
            {
                className: 'string',
                variants: [
                    { begin: /"(?:[^"\\]|\\.)*"/ },
                    { begin: /'(?:[^'\\]|\\.)*'/ },
                ],
            },
            {
                className: 'number',
                variants: [
                    { begin: /\b0x[0-9a-f]+\b/i },
                    { begin: /\b0b[01]+\b/i },
                    { begin: /\b\d+\b/ },
                ],
            },
            {
                className: 'symbol',
                begin: /[a-zA-Z_.$][a-zA-Z0-9_.$]*:/,
            },
            {
                className: 'meta',
                begin: /\.[a-zA-Z][a-zA-Z0-9]*(?=\b)/,
            },
            {
                className: 'keyword',
                begin: REGISTERS,
                relevance: 10,
            },
        ],
    };
}
hljs.registerLanguage('riscv', riscvGrammar);
hljs.registerLanguage('lisp', require('highlight.js/lib/languages/lisp'));

function resolveLanguage(lang) {
    if (!lang) return null;
    const mapped = LANGUAGE_ALIASES[lang.toLowerCase()] || lang;
    return hljs.getLanguage(mapped) ? mapped : null;
}

const marked = new Marked({
    gfm: true,
    breaks: false,
    renderer: {
        code({ text, lang }) {
            const language = resolveLanguage(lang) || 'plaintext';
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
