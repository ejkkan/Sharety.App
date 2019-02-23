{
    "env": {
        "react-native/react-native": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "airbnb-base",
        "prettier",
        "prettier/react"
    ],
        "parserOptions": {
        "ecmaVersion": 9,
            "sourceType": "module",
                "ecmaFeatures": {
            "jsx": true,
                "modules": true,
                    "classes": true
        }
    },
    "plugins": ["react", "react-native", "import", "prettier"],
        "rules": {
        "no-underscore-dangle": "off",
            "no-use-before-define": "off",
                "no-unused-expressions": "off",
                    "react-native/no-unused-styles": "error",
                        "react-native/no-color-literals": "error",
                            "import/no-named-as-default-member": "off",
                                "import/no-extraneous-dependencies": [
                                    "error",
                                    {
                                        "devDependencies": true,
                                        "optionalDependencies": false,
                                        "peerDependencies": false
                                    }
                                ]
    }
}

