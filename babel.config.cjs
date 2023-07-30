// eslint-disable-next-line no-undef
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current', // This will target the Node.js version used by Jest
                },
            },
        ],
        '@babel/preset-react', // Add this line to enable JSX transformations
    ],
    plugins: ['transform-import-meta']
};