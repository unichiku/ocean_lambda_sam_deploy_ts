import * as Webpack from "webpack";
import { resolve } from "path";
import { sync } from "glob";

const SRC_PATH = resolve(__dirname, "./src/functions/");
const ENTRY_NAME = "index.ts";
const BUILT_PATH = resolve(__dirname, "./built");
const BUILD_VARIANT = process.env.NODE_ENV;

const resolveEntry = (): Webpack.Entry => {
  const entries: { [key: string]: string } = {};
  const targets: string[] = sync(`${SRC_PATH}/**/${ENTRY_NAME}`);
  const pathRegex = new RegExp(`${SRC_PATH}/(.+?)/${ENTRY_NAME}`);
  targets.forEach((value: string) => {
    let key: string;
    switch (BUILD_VARIANT) {
      case "development":
        key = value.replace(pathRegex, "dev/$1/index");
        break;
      case "production":
        key = value.replace(pathRegex, "prd/$1/index");
        break;
    }
    entries[key] = value;
  });

  return entries;
};

const config: Webpack.Configuration = {
  target: "node",
  mode: BUILD_VARIANT === "production" ? "production" : "development",
  resolve: {
    extensions: [".ts", ".js"],
  },
  entry: resolveEntry(),
  output: {
    filename: "[name].js",
    path: BUILT_PATH,
    library: "[name]",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: "ts-loader",
      },
    ],
  },
};

export default config;
