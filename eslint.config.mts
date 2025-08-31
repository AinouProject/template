import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginReact from 'eslint-plugin-react'
import globals from 'globals'
import eslintPluginValtio from 'eslint-plugin-valtio'
import eslintPluginTanstackQuery from '@tanstack/eslint-plugin-query'
import eslintPluginTanstackRouter from '@tanstack/eslint-plugin-router'

export default defineConfig([
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json', './packages/**/tsconfig.json'],
        projectFolderIgnoreList: ['**/node_modules/**'],
      },
    },
  },
  eslintPluginPrettierRecommended,
  {
    ...eslintPluginReact.configs.recommended,
    languageOptions: { globals: { ...globals.serviceworker, ...globals.browser } },
    rules: {
      ...eslintPluginReact.configs.recommended.rules,
      'react/self-closing-comp': ['error', { component: true, html: false }],
    },
  },
  eslintPluginReactHooks.configs.recommended,
  { ignores: ['**/generated/**', '**/dist/**'] },
  {
    rules: {
      eqeqeq: ['error', 'smart'],
      'no-undef': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'error',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'warn',
      '@typescript-eslint/require-await': 'warn',
    },
  },
  eslintPluginValtio.configs.flat.recommended,
  eslintPluginValtio.configs.flat['jsx-runtime'],
  eslintPluginTanstackQuery.configs['flat/recommended'],
  eslintPluginTanstackRouter.configs['flat/recommended'],
  { files: ['**/*.{js,cjs,mjs}'], ...tseslint.configs.disableTypeChecked },
])
