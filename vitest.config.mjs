import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
    plugins: [
        react({
            parserConfig(id) {
                if (id.endsWith(".js")) return { syntax: "ecmascript", jsx: true };
                if (id.endsWith(".ts")) return { syntax: "typescript", tsx: true };
            },
        })
    ],
    test: {
        environment: 'jsdom',
        globals: true,
        alias: {
            '~': path.resolve(__dirname, './src')
        },
        exclude: [
            './node_modules',
            './tests/e2e/**/*',
        ],
    }
});