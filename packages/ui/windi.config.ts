import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
	shortcuts: {
		button: "max-w-[fit-content] px-6 py-1.75 | border-2 border-zinc-600 font-medium rounded-lg",
		"button--focus": "outline-none focus:border-lime-500 hover:text-white",
		"button-focus": "button button--focus",
		"button--disabled": "opacity-50",
		"layout-length": "md:max-w-2xl lg:max-w-4xl xl:max-w-6xl"
	},
	theme: {
		extend: {
			fontFamily: {
				poppins: ["Poppins", "sans-serif"]
			}
		}
	}
});
