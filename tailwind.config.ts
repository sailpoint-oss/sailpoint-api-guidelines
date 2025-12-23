import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/app/**/*.{js,jsx,ts,tsx,md,mdx}",
		"./src/**/*.{js,jsx,ts,tsx}",
		"./content/**/*.{md,mdx}",
	],
	theme: {
		extend: {},
	},
};

export default config;


