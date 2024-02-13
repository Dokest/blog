# Blog
## Architecture

### Available routes
The `PostModule` contains three route definitions:
- `GetAboutMeRoute`: Returns the `aboutme.md` page.
- `ReadPostRoute`: Returns each of the other Markdown posts compiled.
- `GetResourceRoute`: Returns the available resources (CSS/images) from the public folder.

### Resources
Markdown posts and the HTML template are stored in the `./web` folder. These files are compiled back into HTML and outputted into the `./public` folder, which is the only externally available folder.

### Commands
Commands are stored in the `./commands` folder and are explained (along with all the other tasks) in the Development section.

## Development
To run the app locally, you must first download the **Nobuk** repository. After downloading it, use the following command to start the app:

```sh
deno task dev
```

To compile the HTML/CSS/Markdown inside `./web` use:

```sh
deno task md
```
You can also keep a file watcher listening using the `--watch` flag.
