import { Action, abortIf } from "$src/deps.ts";
import { IsFilePrivate } from "$src/modules/posts/actions/CheckPrivateFile.ts"


export class GetPublicFileStream extends Action {
	private readonly isFilePrivate = this.dependsOn(IsFilePrivate);


	getFile(filePath: string): Promise<Deno.FsFile> {
		abortIf(this.isFilePrivate.execute(filePath), 404);

		return Deno.open(`./public/${filePath}`);
	}


	getPost(postPath: string): Promise<Deno.FsFile> {
		abortIf(this.isFilePrivate.execute(postPath), 404);

		return Deno.open(`./public/pages/posts/${postPath}.html`);
	}
}
