import { type ConfigObject } from '@eslint/core'
import eslint from '@eslint/js'
import eslintPluginTanstackQuery from '@tanstack/eslint-plugin-query'
import eslintPluginTanstackRouter from '@tanstack/eslint-plugin-router'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import * as eslintPluginValtio from 'eslint-plugin-valtio'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

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
    ...eslintPluginReact.configs.flat.recommended,
    languageOptions: { globals: { ...globals.serviceworker, ...globals.browser } },
    rules: {
      ...eslintPluginReact.configs.flat.recommended.rules,
      'react/self-closing-comp': ['error', { component: true, html: false }],
    },
  },
  {
    plugins: {
      'react-hooks': eslintPluginReactHooks,
    },
    extends: ['react-hooks/recommended'],
  },
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
  eslintPluginValtio.configs['flat/recommended'],
  eslintPluginTanstackQuery.configs['flat/recommended'],
  eslintPluginTanstackRouter.configs['flat/recommended'],
  { files: ['**/*.{js,cjs,mjs}', 'packages/**/vite.config.ts'], ...tseslint.configs.disableTypeChecked },
  { rules: { 'no-redundant-type-constituents': 'off' } },
  ...eslintPluginTanstackQuery.configs['flat/recommended'],
]) as ConfigObject[]
