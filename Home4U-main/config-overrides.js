const webpack = require('webpack');

module.exports = function override(config, env) {
    // Find the rule that handles source maps
    const sourceMapRule = config.module.rules.find(rule =>
        rule.use && rule.use.find(use => use.loader && use.loader.includes('source-map-loader'))
    );

    if (sourceMapRule) {
        // Modify the rule to exclude CSS files
        sourceMapRule.exclude = /\.css$/;
    }

    // Add fallback for crypto module
    config.resolve.fallback = {
        ...config.resolve.fallback,
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
    };

    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        })
    );

    return config;
};