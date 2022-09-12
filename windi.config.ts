import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
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
				arimo: ["Arimo", "sans-serif"]
			}
		}
	}
});
