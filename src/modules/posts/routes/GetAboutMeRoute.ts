import { object, ValidatedRoute, RouteBodyType, OutputContentType } from "$src/deps.ts";
import { GetPublicFileStream } from "$src/modules/posts/actions/GetPublicFileStream.ts";


export class GetAboutMeRoute extends ValidatedRoute {
	override bodyType = RouteBodyType.None;

	override outputContentType = OutputContentType.HTML;

	override input = object({});

	readonly getPublicFileStream = this.dependsOn(GetPublicFileStream);


	async execute(): Promise<ReadableStream<Uint8Array>> {
		const postStream = await this.getPublicFileStream.getPost("aboutme");

		return postStream.readable;
	}
}
