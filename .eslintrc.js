{
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "airbnb-base",
        "eslint:recommended",
        "plugin:prettier/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 2020
    },
    "plugins": ["prettier", "simple-import-sort"],
    "rules": {
        "array-callback-return": "warn",
        "consistent-return": "off",
        "no-await-in-loop": "warn",
        "no-plusplus": "off",
        "no-restricted-syntax": "off",
        "no-underscore-dangle": "warn",
        "no-unused-expressions": "off",
        "prettier/prettier": "off",
        "simple-import-sort/exports": "warn",
        "simple-import-sort/imports": [
            "off",
            {
                "groups": [
                    [
                        // Internal packages come last.
                        "^\\w",
                        "^@"
                    ],
                    [
                        // aliases first
                        "^[~]",
                        "^fixtures",
                        // Parent imports. Put `..` last.
                        "^\\.\\.(?!/?$)",
                        "^\\.\\./?$",
                        // Other relative imports. Put same-folder imports and `.` last.
                        "^\\./(?=.*/)(?!/?$)",
                        "^\\.(?!/?$)",
                        "^\\./?$",
                        // With Side effect imports
                        "^\\u0000"
                    ]
                ]
            }
        ],
        "sort-imports": [
            "warn",
            {
                "allowSeparatedGroups": false,
                "ignoreCase": true,
                "ignoreDeclarationSort": true,
                "ignoreMemberSort": false,
                "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
            }
        ]
    }
}
