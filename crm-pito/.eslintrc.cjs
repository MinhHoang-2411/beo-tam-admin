module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "@typescript-eslint/no-unsafe-assignment": "off", // Tắt cảnh báo gán không an toàn
    "@typescript-eslint/no-unsafe-member-access": "off", // Tắt cảnh báo truy cập thành viên không an toàn
  },
};
