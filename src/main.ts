import { NobukApp, HttpComponent, RequestContext } from "$src/deps.ts";
import { PostModule } from "$modules/posts/Post.module.ts";


export const modules = [
	PostModule,
];


if (import.meta.main) {
	RequestContext.init();

	const app = new NobukApp();

	const httpComponent = new HttpComponent([]);

	app.addComponents([
		httpComponent,
	]);

	app.init(modules);

	httpComponent.listen({
		port: 8080,
	});
}
