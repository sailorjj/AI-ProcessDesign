import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

// WHY: Node ≥23 内置实验性 localStorage 会遮蔽 jsdom 的实现
//（报 "localStorage.clear is not a function"）。通过 NODE_OPTIONS 关掉它，
// worker 进程会继承该环境变量；旧版本 Node 没有这个 flag（会启动失败），
// 主进程里探测到内置 webstorage 存在时才注入
if (
    typeof globalThis.localStorage !== "undefined" &&
    !(process.env.NODE_OPTIONS ?? "").includes("--no-experimental-webstorage")
) {
    process.env.NODE_OPTIONS =
        `${process.env.NODE_OPTIONS ?? ""} --no-experimental-webstorage`.trim()
}

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
        // WHY: Node ≥23 的 localStorage 兼容注入见文件顶部

    },
})
