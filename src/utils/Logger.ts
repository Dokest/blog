import { log } from "$src/deps.ts";


log.setup({
	handlers: {
		default: new log.ConsoleHandler("DEBUG", {
			useColors: true,
		}),
	},
});


export function logger() {
	return log.getLogger();
}
