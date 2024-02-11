import { Middleware } from "$src/deps.ts";
import { MiddlewareQueue } from "../../Nobuk/nobuk-routing/src/http/MiddlewareQueue.ts";
import { logger } from "$src/utils/Logger.ts";


export class LogMiddleware extends Middleware {
	execute(request: Request, queue: MiddlewareQueue, routeParams?: Record<string, unknown>): Promise<Response> {
		const startTime = performance.now();

		const response = queue.next(request, routeParams);

		const timeTaken = performance.now() - startTime;
		logger().info(`Request "${request.url}" (${timeTaken}ms)`);

		return response;
	}
}
