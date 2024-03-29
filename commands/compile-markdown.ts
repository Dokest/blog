
import { compileFile, createHtmlFromMarkdown } from "./utils/markdown.ts";
import { debounce, walk, relative } from "$src/deps.ts";
import { compileTailwind } from "./utils/tailwind.ts";


const POST_PATH = "web/posts/";
const HTML_TEMPLATE = "web/html/html_template.html";
const POST_OUTPUT_PATH = "public/pages/";


type MarkdownFile = { path: string, name: string };


function getHtmlTemplate(): string {
	return Deno.readTextFileSync(HTML_TEMPLATE);
}


async function getMarkdownPathsInDir(dir: string): Promise<MarkdownFile[]> {
	const markdownFiles: MarkdownFile[] = [];

	for await (const f of walk(dir, { exts: ["md"]})) {
		if(!f.isFile) {
			continue;
		}

		if (!f.name.endsWith(".md")) {
			continue;
		}

		let { path, name } = f;
		path = path.replace(".md", "");
		markdownFiles.push({ path, name });
	}

	return markdownFiles;
}

async function compileAllMarkdownFiles(): Promise<void> {
	const files = await getMarkdownPathsInDir(POST_PATH);
	const htmlTemplate = getHtmlTemplate();

	for (const file of files) {
		handleMarkdownFile(`${file.path}.md`, htmlTemplate);
	}
}


export async function watchCompile() {
	await Array.fromAsync(
		Deno.watchFs(["./web"]),
		debounce(async (event) => {
			const template = getHtmlTemplate();

			event.paths.forEach((path) => {
				handleWatchEvent(relative(Deno.cwd(), path), template);
			});

			await compileTailwind();
		}, 200),
	  );
}


function handleMarkdownFile(path: string, htmlTemplate: string): void {
	console.log(`Compiling ${path}...`);

	const text = compileFile(`${path}`);

	const dirPath = path.split("/");
	const fileName = dirPath.pop()?.replace(".md", "") || "UNKNOWN";
	const dirPathString = dirPath.join("/").replace("web/", "");

	createHtmlFromMarkdown(text, htmlTemplate, `${POST_OUTPUT_PATH}${dirPathString}`, fileName);
}


async function handleWatchEvent(path: string, htmlTemplate: string): Promise<void> {
	if (path.endsWith(".md")) {
		handleMarkdownFile(path, htmlTemplate);
	} else if (path.endsWith(".html")) {
		await compileAllMarkdownFiles();
	}
}


if (Deno.args.includes("--watch")) {
	await compileAllMarkdownFiles();

	console.log('Watching for changes...');

	await watchCompile();
} else {
	await compileAllMarkdownFiles();
	await compileTailwind();
}
