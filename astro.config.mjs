// @ts-check
import { defineConfig } from "astro/config";
import d2 from "astro-d2";
import starlight from "@astrojs/starlight";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
    site: "https://tbp.breweryteam.dev",
    vite: {
        // @ts-expect-error: https://github.com/withastro/astro/issues/14030
        plugins: [tailwindcss()],
    },
    integrations: [
        starlight({
            title: "TheBrewingProject",
            components: {
                PageFrame: "./src/components/overrides/PageFrame.astro",
                PageTitle: "./src/components/overrides/PageTitle.astro",
                Pagination: "./src/components/overrides/Pagination.astro",
                Sidebar: "./src/components/overrides/Sidebar.astro",
                TwoColumnContent: "./src/components/overrides/TwoColumnContent.astro",
            },
            customCss: ["./src/styles/fonts.css", "./src/styles/globals.css", "./src/styles/docs.css"],
            logo: { src: "./src/assets/img/favicon.png", alt: "TheBrewingProject" },
            favicon: "./favicon.png",
            social: [
                { icon: "github", label: "GitHub", href: "https://github.com/BreweryTeam/TheBrewingProject" },
                { icon: "discord", label: "Discord", href: "https://discord.gg/3FkNaNDnta" },
            ],
            sidebar: [
                {
                    label: "Welcome",
                    slug: "docs/welcome",
                },
                {
                    label: "For Server Owners",
                    items: [
                        {
                            label: "Install",
                            link: "docs/for-server-owners/install",
                        },
                        {
                            label: "How To's",
                            autogenerate: { directory: "docs/for-server-owners/how-to/" },
                            collapsed: true,
                        },
                        {
                            label: "Reference",
                            autogenerate: { directory: "docs/for-server-owners/reference/" },
                            collapsed: true,
                        },
                    ],
                },
                {
                    label: "For Players",
                    items: [
                        {
                            label: "Guides",
                            autogenerate: { directory: "docs/for-players/guides/" },
                            collapsed: true,
                        },
                    ],
                },
                {
                    label: "Miscellaneous",
                    autogenerate: { directory: "docs/misc/" },
                    collapsed: true,
                },
            ],
            expressiveCode: {
                themes: ["slack-dark", "light-plus"],
                plugins: [pluginLineNumbers()],
                defaultProps: {
                    showLineNumbers: false,
                    overridesByLang: {
                        yaml: {
                            showLineNumbers: true,
                        },
                    },
                },
            },
        }),
        react(),
        d2(),
    ],
});
