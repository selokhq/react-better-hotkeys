import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import generateDocsPlugin from "./src/plugins/generate-docs";

const config: Config = {
  title: "React Better Hotkeyss",
  tagline: "Effortless, accessible keyboard shortcuts for React",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true,
  },

  themes: ["@docusaurus/theme-live-codeblock"],

  // Production site + GitHub Pages project path
  url: "https://selokhq.github.io",
  baseUrl: "/react-better-hotkeys/",

  // GitHub pages deployment config.
  organizationName: "selokhq",
  projectName: "react-better-hotkeys",
  deploymentBranch: "gh-pages",

  onBrokenLinks: "throw",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/selokhq/react-better-hotkeys",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "React Better Hotkeyss",
      // logo: {
      //   alt: "Logo",
      //   src: "img/logo.svg",
      // },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Tutorial",
        },
        {
          href: "https://github.com/selokhq/react-better-hotkeys",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting Started",
              to: "/",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/selokhq/react-better-hotkeys/react-better-hotkeys",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Christopher Haindl`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
      magicComments: [
        {
          className: "theme-code-block-highlighted-line",
          line: "highlight-next-line",
          block: { start: "highlight-start", end: "highlight-end" },
        },
        {
          className: "theme-code-block-hidden-line",
          line: "doc-hide-line",
          block: { start: "doc-hide-start", end: "doc-hide-end" },
        },
        {
          className: "code-block-error-line",
          line: "This will error",
        },
      ],
    },
  } satisfies Preset.ThemeConfig,
  plugins: [generateDocsPlugin],
};

export default config;
