
export async function compileTailwind(): Promise<void> {
	const start = performance.now();

	const cmd = new Deno.Command("./tailwindcss", { args: [
		"-i",
		"./web/css/tailwind.base.css",
		"-o",
		"./public/_resources/css/output.css",
	]});

	const { code, stdout, stderr } = await cmd.output();
	// stdout & stderr are a Uint8Array
	if (stdout.length > 0) {
		// console.log(new TextDecoder().decode(stdout)); // hello world
	}

	if (stderr.length > 0) {
		console.log(new TextDecoder().decode(stderr)); // hello world
	}

	const elapsedTime = (performance.now() - start).toFixed(2);

	console.log(`Compiled Tailwind in ${elapsedTime}ms...`);
}
