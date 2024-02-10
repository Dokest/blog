import { object, string, ValidatedRoute, RouteBodyType, OutputContentType } from "$src/deps.ts";
import { GetPostFromFilesystem } from "$src/modules/posts/actions/GetPostFromFilesystem.ts";


export class GetAboutMeRoute extends ValidatedRoute {
	override bodyType = RouteBodyType.None;

	override outputContentType = OutputContentType.HTML;

	override input = object({});

	readonly getPostFromFilesystem = this.dependsOn(GetPostFromFilesystem);


	execute(): Promise<string> {
		return this.getPostFromFilesystem.execute("aboutme");
	}
}
