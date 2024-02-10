import { MoldOutput, object, string, ValidatedRoute, RouteBodyType, OutputContentType } from "$src/deps.ts";
import { GetPostFromFilesystem } from "$src/modules/posts/actions/GetPostFromFilesystem.ts";


export class ReadPostRoute extends ValidatedRoute {
	override bodyType = RouteBodyType.None;

	override outputContentType = OutputContentType.HTML;

	override input = object({
		"_": string(),
	});

	readonly getPostFromFilesystem = this.dependsOn(GetPostFromFilesystem);


	execute(input: MoldOutput<this["input"]>): Promise<string> {
		return this.getPostFromFilesystem.execute(input._);
	}
}
