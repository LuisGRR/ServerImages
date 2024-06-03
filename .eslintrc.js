module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    extends: [
        "plugin:node/recommended",
    ],
    "overrides": [
        {
            "files": [
                ".eslintrc.{js}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "no-unused-vars": ["error", { "argsIgnorePattern": "req|res|next" }],
        "no-console": "off",
        
    }
}
