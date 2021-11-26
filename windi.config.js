import { defineConfig } from "vite-plugin-windicss";
const { transform } = require("windicss/helpers");

let windiConfig = {
    transformCSS: "pre",
    attributify: false,
    darkMode: "class",
    extract: {
        include: ["index.html", "src/**/*.{vue,html,js}"],
        exclude: ["node_modules", ".gitignore", ".gitattribute", ".eslint", ".eslingignore", "prettierrc", ".prettierignore"],
    },
    theme: {
        extend: {
            backgroundImage: (theme) => ({
                check: "url('/check.svg')",
            }),
        },
    },
    plugins: [transform("tailwind-bootstrap-grid")],
};

let configuration = defineConfig(windiConfig);

export default configuration;
