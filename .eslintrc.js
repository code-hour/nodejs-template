module.exports = {
    "extends": "airbnb-base",
    "rules": {
        "comma-dangle": ["error", "always-multiline"],
        "no-underscore-dangle": 0,
        "max-len": ["error", {
            "code": 120,
            "comments": 250
        }],
        "camelcase": 0,
        "prefer-promise-reject-errors": 0
    },
};
