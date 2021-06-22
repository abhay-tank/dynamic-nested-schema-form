const fs = require("fs");
const path = require("path");

const prettierOptions = JSON.parse(
	fs.readFileSync(path.resolve(__dirname, ".prettierrc"), "utf8")
);

module.exports = {
	extends: ["react-app", "prettier", "prettier/react"],
	plugins: ["prettier", "sort-imports-es6-autofix"],
	rules: {
		"prettier/prettier": ["error", prettierOptions],
		"sort-imports-es6-autofix/sort-imports-es6": [
			2,
			{
				ignoreCase: true,
				ignoreMemberSort: false,
				memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
			},
		],
	},
	overrides: [
		{
			files: ["**/*.ts?(x)"],
			rules: { "prettier/prettier": ["warn", prettierOptions] },
		},
	],
};
