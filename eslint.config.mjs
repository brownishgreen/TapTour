import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  // 通用的 ESLint 配置
  {
    files: ["**/*.js", "**/*.jsx"], // 設定要檢查的檔案類型
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      js: pluginJs,
      react: pluginReact,
      prettier: prettierPlugin,
    },
    rules: {
      "no-unused-vars": "error", // 禁止未使用的變數
      quotes: ["error", "single"], // 必須使用單引號
      eqeqeq: "error", // 要求使用 === 或 !==
      semi: ['error', 'never'], // 禁止使用分號
      indent: ["error", 2], // 強制縮排為 2 空格
    },
  },

  // React 特定配置
  {
    files: ["**/*.jsx"],
    settings: {
      react: {
        version: "detect", // 自動偵測 React 版本
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // 如果你使用 React 17+ 可關閉這條規則
    },
  },

  // Prettier 整合配置
  {
    rules: {
      ...prettierConfig.rules, // 引入 Prettier 規則
      "prettier/prettier":["error", { singleQuote: true }], // 使用 Prettier 檢查
    },
  },
];