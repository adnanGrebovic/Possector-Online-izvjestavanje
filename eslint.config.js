import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
    rules: {
      "jsx-a11y/label-has-associated-control": "off" 
      [
        "error",
        {
          "controlComponents": ["Field"],
          "assert": "both"
        }
      ],
      "jsx-a11y/label-has-for": "off"  // Turn off deprecated rule
    }
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];


