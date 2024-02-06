module.exports = {
    extends: [
        'stylelint-config-recommended-scss',
        'stylelint-config-rational-order',
    ],
    plugins: [
        'stylelint-order',
        'stylelint-scss'
    ],
    overrides: [{
        files: ["**/*.vue"],
        customSyntax: "postcss-html",
        rules: {
            indentation: 4,
        }
    }],
    rules: {
        indentation: 2,
        "selector-pseudo-class-no-unknown": [true, {
            "ignorePseudoClasses": ["deep",""]
        }]
    },
};
