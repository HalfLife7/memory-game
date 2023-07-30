/* eslint-env node */
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    moduleFileExtensions: ['js', 'jsx', 'json'],
    testMatch: ['<rootDir>/src/**/*.test.(js|jsx)'],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
        "\\.(css|less|sass|scss)$": "identity-obj-proxy"
    },
};