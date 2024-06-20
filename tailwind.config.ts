import type {Config} from "tailwindcss";

const plugin = require("tailwindcss/plugin");


const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    safelist: [
        "bg-logiviande",
        "bg-silos",
        "bg-lsa",
        "bg-comptinnov",
        "bg-accent",
        "bg-featured",
        "bg-featured-shadow",
        "border-logiviande",
        "border-lsa",
        "border-silos",
        "border-comptinnov",
        "border-featured-shadow",
        "border-accent",
        "border-featured",
        "hover:bg-logiviandeHover",
        "hover:bg-silosHover",
        "hover:bg-lsaHover",
        "hover:bg-comptinnovHover",
        "hover:bg-accent-shadow",
        "hover:bg-featured-shadow",
        "hover:bg-featured"
    ],
    theme: {
        screens: {
            xs: "480px",
            sm: "640px",
            md: "768px",
            lg: "1080px",
            xl: "1280px",
            "2xl": "1536px",
            se: {'raw': '(min-width: 370px) and (max-height: 670px)'},
            tabletH: {'raw': ' (max-height: 768px)'},
        },
        extend: {
            colors: {
                accent: {
                    DEFAULT: "#663B8E",
                    muted: "#E8DDF7",
                    shadow: "#381952",
                    shine: "#FAF7FD",
                    peps: "#533172",

                },
                featured: {
                    DEFAULT: "#0057B4",
                    muted: "#B2DFFF",
                    shadow: "#002651",
                    shine: "#EEF7FF",
                    peps: "#006EDF"
                },
                grayscale: {
                    darkest: "#3D3D3D",
                    darker: "#5D5D5D",
                    medium: "#D1D1D1",
                    lighter: "#E7E7E7",
                    lightest: "#F6F6F6",
                },
                menuButton: "#E7E7E7",
                badge: {
                    1: "#00265114",
                    2: "#663B8E14",
                    3: "#0057B414",
                    4: "#38195214"
                },
                solution: {
                    logiviande: "#AA0C08",
                    logiviandeHover: "#940A07",
                    silos: "#A76225",
                    silosHover: "#925620",
                    lsa: "#647D36",
                    lsaHover: "#5B7231",
                    comptinnov: "#400EA4",
                    comptinnovHover: "#39097A"
                }
            },
            fontSize: {
                h1: ["clamp(2.2rem, 1.915rem + 1.425vw, 3.625rem)", {
                    lineHeight: "1.1",
                    fontWeight:700
                }],
                h2: "clamp(2rem, 1.8684rem + 0.6579vw, 2.5rem)",
                h3: "clamp(1.375rem, 1.2434rem + 0.6579vw, 1.875rem)",
                h4: "clamp(1.125rem, 1.0263rem + 0.4934vw, 1.5rem)",
                h5: "clamp(1.125rem, 1.0921rem + 0.1645vw, 1.25rem)",
                h6: "1.125rem",
                base: "clamp(0.9375rem, 0.925rem + 0.0625vw, 1rem)",
                summary: "0.875rem",
                badge: "0.75rem"
            },
            boxShadow: {
                nav: "0px 2px 48px 0px rgba(0, 0, 0, 0.04)",
                subNav: "0px 4px 48px 0px rgba(0, 0, 0, 0.12)",
                slide: "0px 4px 24px 0px rgba(0, 0, 0, 0.16)",
                thumb: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                sidebarCard: "0px 4px 24px 0px rgba(0, 0, 0, 0.16)",
                featuredTab: "0px 4px 24px 0px rgba(0, 0, 0, 0.16)",
                storyCard:"0px 12px 16px 0px rgba(0, 0, 0, 0.08)"
            },
            height: {
                hero: "calc(100vh - 115px)",
                heroPage: "calc(100vh - 115px)",
            },
            listStyleImage: {
                check: 'url("/check.svg")',
            },
            backgroundImage: {
                map: "linear-gradient(180deg, #EEF7FF 15.77%, rgba(220, 238, 255, 0.00) 100%)"
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        plugin(function ({addComponents, addVariant}: Config) {
            addComponents({
                ".container": {
                    "@apply max-w-screen-xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-0": {},
                },
                ".btn": {
                    "@apply inline-flex justify-center items-center gap-2 font-bold p-3 lg:px-6 xl:px-8 rounded-lg text-base transition-all duration-300 ease-out": {},
                },
                ".btn-medium": {
                    "@apply inline-flex items-center font-bold px-4 py-3 rounded-lg text-sm transition-all duration-300 ease-out": {},
                },
                ".btn-small": {
                    "@apply inline-flex items-center font-bold px-3 py-1 rounded-lg text-sm border border-grayscale-lighter bg-white hover:bg-grayscale-lightest transition-all duration-300 ease-out": {},
                },
                ".btn-small-minor": {
                    "@apply text-accent": {},
                },
                ".btn-menu": {
                    "@apply inline-flex lg:hidden items-center px-2.5 py-2 rounded-lg text-sm bg-grayscale-lighter hover:bg-grayscale-medium transition-all duration-300 ease-out": {},
                },
                ".btn-accent": {
                    "@apply bg-accent text-white hover:bg-accent-peps outline-none ring-accent-muted focus-visible:ring active:bg-accent-shadow": {},
                },
                ".btn-white": {
                    "@apply bg-white text-featured hover:bg-featured-shine": {},
                },
                ".btn-gray": {
                    "@apply bg-grayscale-lighter text-grayscale-darker hover:bg-grayscale-medium outline-none ring-grayscale-medium focus-visible:ring active:bg-grayscale-medium": {},
                },
                ".btn-white-gray": {
                    "@apply bg-white text-grayscale-darker border border-grayscale-lighter hover:bg-grayscale-lighter outline-none ring-grayscale-medium focus-visible:ring active:bg-grayscale-medium focus-visible:ring active:bg-gray-200": {},
                },
                ".btn-circle": {
                    "@apply size-12 border rounded-full inline-flex items-center justify-center transition-all duration-500 ease-out": {}
                },
                ".link": {
                    "@apply text-h5 text-featured hover:text-featured-peps font-bold transition-all duration-500 ease-out": {}
                },
                ".link-normal": {
                    "@apply text-featured-peps hover:text-black transition-all duration-500 ease-out": {}
                },
                ".link-normal-white": {
                    "@apply text-white hover:text-featured-peps transition-all duration-500 ease-out": {}
                },
                ".footer-link": {
                    "@apply text-[1rem] text-grayscale-darker hover:text-featured-peps transition-all duration-500 ease-out": {}
                },
                ".paragraph": {
                    "@apply text-base text-grayscale-darker": {}
                },
                ".label-style": {
                    "@apply text-featured flex flex-col gap-2": {}
                },
                ".radio-style": {
                    "@apply text-transparent !border-featured-shadow": {}
                },
                ".input-style": {
                    "@apply border-grayscale-lighter bg-featured-shine rounded": {}
                },
                ".sidebarCard": {
                    "@apply lg:text-h5 p-4 lg:p-6 flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-4 rounded-2xl shadow-sidebarCard h-[8.5rem] transition-all duration-300 ease-out": {}
                },
            })
        }),
        function ({addVariant}: Config) {
            addVariant('child', '& > *');
            addVariant('child-hover', '& > *:hover');
        }
    ],
};
export default config;
