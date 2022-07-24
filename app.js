const { nodeExternalsPlugin } = require("esbuild-node-externals");

require("esbuild")
	.build({
		entryPoints: ["./src/index.ts"],
		outdir: "./dist",
		watch: true,
		platform: "node",
		minify: true,
		minifyIdentifiers: true,
		minifySyntax: true,
		minifyWhitespace: true,
		bundle: true,
		sourcemap: true,
		plugins: [nodeExternalsPlugin()],
	})
	.catch(console.error);
