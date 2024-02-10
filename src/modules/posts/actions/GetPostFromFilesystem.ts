import { Action } from "$src/deps.ts";


export class GetPostFromFilesystem extends Action {
	execute(postPath: string): Promise<string> {
		return Deno.readTextFile(`${Deno.cwd()}/public/pages/posts/${postPath}.html`);
	}
}
