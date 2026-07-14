// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	site: "https://karting-apartment.it",
	integrations: [
		react(),
		sitemap({
			i18n: {
				defaultLocale: "en",
				locales: {
					en: "en-US",
					it: "it-IT",
					pl: "pl-PL",
				},
			},
			filter: (page) =>
				page !== "https://karting-apartment.it/" &&
				page !== "https://karting-apartment.it",
		}),
	],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@": path.resolve(root, "src"),
			},
		},
	},
	output: "static",
	i18n: {
		defaultLocale: "en",
		locales: ["en", "it", "pl"],
		routing: {
			prefixDefaultLocale: true,
		},
	},
});
