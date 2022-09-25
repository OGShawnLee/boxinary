import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
	shortcuts: {
		button: "min-h-10 px-6 | border-2 rounded-xl",
		"button--lg": "min-h-12 px-8 | text-xl",
		"button--aqua": "border-aqua-50 font-bold text-white",
		"button--raisin": "border-raisin-20 text-rich-90 font-medium",
		"button--rose": "border-rose-600/50 text-rich-90 font-medium",
		"grid-center": "grid place-content-center",
		"max-w-fit": "max-w-[fit-content]"
	},
	theme: {
		extend: {
			colors: {
				aqua: {
					90: "#CCFFEE",
					75: "#80FFD4",
					50: "#33FFBB"
				},
				raisin: {
					20: "#30293D",
					15: "#241F2E",
					12: "#1D1825",
					10: "#18141F"
				},
				rich: {
					90: "#E0E0EB",
					75: "#B2B2CC",
					50: "#73738C"
				}
			},
			fontFamily: {
				arimo: ["Arimo", "sans-serif"],
				victor: ["Victor Mono", "monospace"]
			}
		}
	}
});
