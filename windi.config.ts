import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
	shortcuts: {
		button: "min-h-10 px-6 | border-2 rounded-xl",
		"button--lg": "min-h-12 px-8 | text-xl",
		"button--aqua": "border-aqua-50 text-lg text-white font-medium",
		"button--raisin": "border-raisin-20 text-rich-90 font-medium",
		"button--rose": "border-rose-600/50 text-rich-90 font-medium",
		"button-option": "px-2 text-sm",
		"button-option-compact": "px-0.5 md:px-2 text-sm",
		"button-option--rich": "hover:text-aqua-50",
		"button-option--caution": "text-amber-600/80 hover:text-amber-500",
		"button-option--danger": "text-rose-600/80 hover:text-rose-500",
		"button-option--emphasis": "text-white font-medium hover:(text-aqua-50 underline)",
		"grid-center": "grid place-content-center",
		"max-w-fit": "max-w-[fit-content]",
		"layout-length": "md:max-w-2xl lg:max-w-4xl xl:max-w-6xl"
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
				victor: ["Victor Mono", "monospace"],
				quick: ["Quicksand", "sans-serif"],
				poppins: ["Poppins", "sans-serif"]
			}
		}
	}
});
