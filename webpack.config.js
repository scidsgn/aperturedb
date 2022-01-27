const path = require("path/posix")
const webpack = require("webpack")

const config = {
    entry: [
        "react-hot-loader/patch",
        "./app/index.tsx"
    ],
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(ts|tsx)$/,
                loader: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    devServer: {
        "static": {
            directory: "./public"
        }
    },
    resolve: {
        extensions: [
            ".tsx", ".ts", ".js"
        ],
        alias: {
            "react-dom": "@hot-loader/react-dom"
        }
    },
    performance: {
        hints: false,
        maxEntrypointSize: 1024000,
        maxAssetSize: 1024000
    }
}

module.exports = config