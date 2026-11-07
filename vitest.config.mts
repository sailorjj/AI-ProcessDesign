import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        environment: "jsdom",
        include: ["tests/**/*.test.{ts,tsx}"],
        // vi.stubEnv values are undone after each test
        unstubEnvs: true,
        // WHY: Windows 机器上 esbuild 冷启动与 jsdom 环境初始化会超过默认 5s
        // 单测超时，放宽到 30s（慢机器兼容，测试本身仍是毫秒级）
        testTimeout: 30000,
    },
})
