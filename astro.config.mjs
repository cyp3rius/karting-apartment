// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	site: "https://kartingapartment.pl",
	integrations: [
		react(),
		sitemap({
			i18n: {
				defaultLocale: "pl",
				locales: {
					en: "en-US",
					it: "it-IT",
					pl: "pl-PL",
				},
			},
			filter: (page) =>
				page !== "https://kartingapartment.pl/pl/" &&
				page !== "https://kartingapartment.pl/pl",
			customPages: [
				"https://kartingapartment.pl/",
				"https://kartingapartment.pl/en/",
				"https://kartingapartment.pl/it/",
			],
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
	output: "server",
	adapter: vercel({
		webAnalytics: {
			enabled: true,
		},
	}),
	i18n: {
		defaultLocale: "pl",
		locales: ["en", "it", "pl"],
		routing: "manual",
	},
});
