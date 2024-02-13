import { mime } from "$src/deps.ts";
import { Route } from "$src/deps.ts";
import { GetPublicFileStream } from "$src/modules/posts/actions/GetPublicFileStream.ts";


export class GetResourceRoute extends Route {
	private readonly getPublicFileStream = this.dependsOn(GetPublicFileStream);


	async handle(request: Request, routeParams?: Record<string, unknown>): Promise<Response> {
		const file = await this.getPublicFileStream.getFile(`_resources/${routeParams!["_"]}`);

		return new Response(file.readable, {
			headers: {
				"content-type": this.getFileContentType(request.url),
			},
		});
	}


	private getFileContentType(path: string): string {
		return mime.getType(path) ?? "text/plain";
	}
}
