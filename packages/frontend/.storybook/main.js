module.exports = {
  stories: ['../src/**/*.stories.(js|mdx|ts|tsx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    {
      name: '@storybook/preset-create-react-app',
      options: {
        tsDocgenLoaderOptions: {},
      },
    },
  ],
}
