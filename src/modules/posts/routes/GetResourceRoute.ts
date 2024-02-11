import { mime } from "$src/deps.ts";
import { Route } from "$src/deps.ts";
import { abort } from "@nobuk/helpers/mod.ts";


export class GetResourceRoute extends Route {
	async handle(request: Request, routeParams?: Record<string, unknown>): Promise<Response> {
		const fileContents = await Deno.readFile(`public/_resources/${routeParams!["_"]}`);

		const file = await Deno.open(`public/_resources/${routeParams!["_"]}`);

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
