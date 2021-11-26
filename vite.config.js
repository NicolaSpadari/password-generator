import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";
import Component from "unplugin-vue-components/vite";
import { chromeExtension } from "vite-plugin-chrome-extension";
import { resolve } from "path";

export default defineConfig({
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src")
        }
    },
    plugins: [
        Vue({
            include: [/\.vue$/]
        }),
        WindiCSS(),
        Component({
            extensions: ["vue"],
            dirs: ["src/components"],
            deep: false
        }),
        chromeExtension()
    ],
    build: {
        rollupOptions: {
            input: "src/manifest.json"
        }
    },
    server: {
        fs: {
            allow: [".."]
        }
    }
});
