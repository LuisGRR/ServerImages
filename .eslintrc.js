module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "quotes": [2, "double"]
    }
}
