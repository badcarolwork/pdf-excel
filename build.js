const esbuild = require("esbuild");
const path = require("path");

const isWatch = process.argv.includes("--watch");

const config = {
  entryPoints: [path.join(__dirname, "src/main.ts")],
  bundle: true,
  outfile: path.join(__dirname, "assets/js/bundle.js"),
  platform: "browser",
  target: ["es2017"],
  format: "iife",
  sourcemap: true,
  minify: !isWatch,
};

if (isWatch) {
  esbuild.context(config).then((ctx) => {
    ctx.watch();
    console.log("Watching…");
  });
} else {
  esbuild.build(config).then(() => {
    console.log("Build complete → assets/js/bundle.js");
  }).catch(() => process.exit(1));
}
