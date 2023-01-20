import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
	shortcuts: {
		button:
			"max-w-[fit-content] px-6 py-1.75 | border-2 rounded-lg font-medium outline-none hover:text-white",
		"button-small":
			"max-w-[fit-content] px-4 py-1.25 border-2 border-raisin-20 rounded-md outline-none text-sm focus:border-rich-75",
		"button--closed": "border-raisin-20 hover:text-rich-90 focus:(border-raisin-50 text-rich-90)",
		"button--disabled": "border-raisin-15 opacity-50",
		"button--open":
			"bg-raisin-15 text-white border-raisin-12 hover:bg-raisin-20 focus:border-rich-75",
		"button-focus": "button button--focus",
		"button--tab": "rounded-b-none",
		panel: "p-6 | grid gap-3 | bg-raisin-12 rounded-xl",
		"panel--modal":
			"fixed transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 | bg-raisin-10",
		overlay: "fixed inset-0 | bg-raisin-05/90 backdrop-filter backdrop-blur-1px",
		"layout-length": "md:max-w-2xl lg:max-w-4xl xl:max-w-6xl",
		"max-w-fit": "max-w-[fit-content]"
	},
	theme: {
		colors: {
			aqua: {
				90: "#CCFFEE",
				75: "#80FFD4",
				50: "#33FFBB"
			},
			black: "#000000",
			raisin: {
				50: "#6A40BF",
				30: "#3B3050",
				20: "#30293D",
				15: "#241F2E",
				12: "#1D1825",
				10: "#18141F",
				"05": "#0C0B0F"
			},
			rich: {
				90: "#E0E0EB",
				75: "#B2B2CC",
				50: "#73738C"
			},
			transparent: "transparent",
			white: "#FFFFFF"
		},
		extend: {
			fontFamily: {
				poppins: ["Poppins", "sans-serif"]
			}
		}
	}
});
