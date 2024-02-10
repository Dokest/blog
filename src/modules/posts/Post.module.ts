import { Module } from "@nobuk/core/mod.ts";
import { HttpHandler, Router } from "@nobuk/routing/mod.ts";
import { ReadPostRoute } from "./routes/ReadPost.route.ts";
import { GetResourceRoute } from "$src/modules/posts/routes/GetResourceRoute.ts";
import { GetAboutMeRoute } from "$src/modules/posts/routes/GetAboutMeRoute.ts";


export class PostModule extends Module implements HttpHandler {
	routes(router: Router) {
		router
			.get("/", GetAboutMeRoute)
			.get("/posts/**", ReadPostRoute)
			.get("/resource/**", GetResourceRoute);
	}
}
