import { NobukApp, HttpComponent, RequestContext, ErrorHandlingMiddleware } from "$src/deps.ts";
import { PostModule } from "$modules/posts/Post.module.ts";
import { LogMiddleware } from "$src/middlewares/LogMiddleware.ts";


export const modules = [
	PostModule,
];


if (import.meta.main) {
	RequestContext.init();

	const app = new NobukApp();

	const httpComponent = new HttpComponent([
		ErrorHandlingMiddleware,
		LogMiddleware,
	]);

	app.addComponents([
		httpComponent,
	]);

	app.init(modules);

	httpComponent.listen({
		port: 8080,
	});
}
