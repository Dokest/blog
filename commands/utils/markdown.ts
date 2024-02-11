import { MarkdownIt, markdownitHighlight, mila, markdownItAttrs } from "$src/deps.ts";

const md = new MarkdownIt({
	html: true,
	linkify: true,
	typographer: true,
	breaks: true,
})
	.use(markdownitHighlight.default)
	.use(mila, {
		matcher(href: string) {
			return href.startsWith("https:") || href.startsWith("http:");
		},
		attrs: {
			target: "_blank",
			rel: "noopener",
		},
	})
	.use((md, options) => {
		md.renderer.rules.code_block = renderCode(md.renderer.rules.code_block, options);
		md.renderer.rules.fence = renderCode(md.renderer.rules.fence, options);
	}, {})
	.use(markdownItAttrs);

function renderCode(origRule: any, options: any) {
	return (...args: any[]) => {
		const [tokens, idx] = args;

		const content = tokens[idx].content
			.replaceAll('"', "&quot;")
			.replaceAll("'", "&apos;");

		const origRendered = origRule(...args);

		if (content.length === 0) {
			return origRendered;
		}

		return `<div style="position: relative" class="code-block">${origRendered}
			<button class="markdown-it-code-copy" title="Copy" onclick="navigator.clipboard.writeText(\`${content}\`)">
				<svg xmlns="http://www.w3.org/2000/svg" style="width: 25px; height: 25px;"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" /></svg>
			</button>
		</div>
	`;
	};
}

export function compileFile(path: string): string {
	const text = Deno.readTextFileSync(path);

	return md.render(text);
}

export function createHtmlFromMarkdown(
	markdown: string,
	htmlTemplate: string,
	outputDir: string,
	outputName: string,
): string {
	const replacedContents = htmlTemplate.replace("{{ POST_CONTENT }}", markdown);

	const outputPath = `${outputDir}/${outputName}.html`;

	Deno.mkdirSync(outputDir, { recursive: true });
	Deno.writeTextFileSync(outputPath, replacedContents, { create: true });

	return outputPath;
}
