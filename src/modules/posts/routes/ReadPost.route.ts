import { MoldOutput, object, string, ValidatedRoute, RouteBodyType, OutputContentType } from "$src/deps.ts";
import { GetPublicFileStream } from "$src/modules/posts/actions/GetPublicFileStream.ts";


export class ReadPostRoute extends ValidatedRoute {
	override bodyType = RouteBodyType.None;

	override outputContentType = OutputContentType.HTML;

	override input = object({
		"_": string(),
	});

	readonly getPublicFileStream = this.dependsOn(GetPublicFileStream);


	async execute(input: MoldOutput<this["input"]>): Promise<ReadableStream<Uint8Array>> {
		const postStream = await this.getPublicFileStream.getPost(input._);

		return postStream.readable;
	}
}
