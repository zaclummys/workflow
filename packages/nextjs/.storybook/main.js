import { join, dirname, resolve } from "path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, "package.json")));
}

/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        getAbsolutePath("@storybook/addon-onboarding"),
        getAbsolutePath("@storybook/addon-links"),
        getAbsolutePath("@storybook/addon-essentials"),
        getAbsolutePath("@chromatic-com/storybook"),
        getAbsolutePath("@storybook/addon-interactions"),
        getAbsolutePath("@storybook/addon-styling-webpack")
    ],
    framework: {
        name: getAbsolutePath("@storybook/nextjs"),
        options: {},
    },
    webpackFinal: (config) => {
        config.module.rules.push({
            test: /\.css$/,
            use: [
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [
                                require("tailwindcss"),
                                require("autoprefixer")
                            ],
                        },
                    },
                },
            ],
            include: resolve(__dirname, "../"),
        });
        return config;
    },
    docs: {
        autodocs: "tag",
    },
    staticDirs: ["../public"],
};
export default config;
