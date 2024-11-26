import { defineConfig, loadEnv } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import tailwindcss from "tailwindcss";
import uniTailwind from "@uni-helper/vite-plugin-uni-tailwind";

// https://vitejs.dev/config/
export default defineConfig((env) => {
  const evnMap = loadEnv(env.mode, process.cwd());
  console.log("evnMap", evnMap);
  return {
    plugins: [uni(), uniTailwind()],
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
    server: {
      port: evnMap.VITE_PORT, // 启动端口
    },
    // vite 配置
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
      "process.env": { ...env, ...evnMap },
    },
  };
});
