import { Action } from "$src/deps.ts";


export class IsFilePrivate extends Action {
	execute(path: string): boolean {
		return path.includes("/_");
	}
}
