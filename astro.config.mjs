// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	site: "https://kartingapartment.pl",
	integrations: [react()],
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
