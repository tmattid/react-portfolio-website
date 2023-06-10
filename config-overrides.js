module.exports = function override(config, env) {
  // Find the rule that contains oneOf
  const oneOfRule = config.module.rules.find(rule => rule.oneOf !== undefined);
  
  if (oneOfRule) {
    const svgRuleIndex = oneOfRule.oneOf.findIndex(
      rule => rule.test && rule.test.toString().includes('svg')
    );

    // Exclude SVG Files from the file-loader rule
    const svgRule = oneOfRule.oneOf[svgRuleIndex];
    svgRule.exclude = /\.svg$/;

    // Add a new rule for SVG files
    oneOfRule.oneOf.unshift({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            strictExportPresence: false,
            throwIfNamespace: false, // defaults to true
          },
        },
      ],
    });
  }

  return config;
};
