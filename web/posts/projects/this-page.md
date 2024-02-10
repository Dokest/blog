# Project: This blog
This blog is a personal project that allows me to try new web projects, and also provides a space to show some of my projects to the world.

## Overview of the site
There are multiple interesting things about this blog.
1. The posts themselves are made using Markdown. The non-blog parts are "hand-made" with HTML and Tailwind (CSS).
2. It is completely offline-rendered and the client does not need to execute any Javascript code.
3. The backend is completely custom-made by me, as a part of a larger project called *Nobuk* (pronounced "no book"), build on top of Deno. The code for *Nobuk* is not currently public, although the plan is to Open-Source the project at some point.
4. This blog is hosted on [Deno Deploy](https://deno.com/deploy) free tier.

### Markdown pipeline
As written above, this post is written is Markdown, the Markdown is compiled by a third party Markdown compiler into HTML as part of a pipeline.

The pipeline is capable of detecting real-time changes made to each Markdown file. When a change is detected, the pipeline compiles that Markdown file into a HTML string. That HTML string is then placed into an HTML template that I have prepared. The HTML template contains all the header, footer and other static elements shared between all the pages. The pipeline also compiles the Tailwind CSS into a optimized CSS. Both the prepared HTML and the prepared CSS are placed in specific folders of the project, where they are ready to be delivered to the user.
