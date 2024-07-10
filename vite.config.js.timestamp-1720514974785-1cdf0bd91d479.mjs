// vite.config.js
import { resolve } from "node:path";
import { defineConfig } from "file:///C:/web/web/techit-school/vanilla-project/eight-lane-highway/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "C:\\web\\web\\techit-school\\vanilla-project\\eight-lane-highway";
var vite_config_default = defineConfig({
  build: {
    outDir: "docs",
    rollupOptions: {
      input: {
        main: resolve(__vite_injected_original_dirname, "index.html"),
        header: resolve(__vite_injected_original_dirname, "src/component/header/header.html"),
        register: resolve(__vite_injected_original_dirname, "src/pages/signup/index.html"),
        productinfo: resolve(
          __vite_injected_original_dirname,
          "src/component/product/product-info.html"
        ),
        product: resolve(__vite_injected_original_dirname, "src/component/product/product.html"),
        popup: resolve(__vite_injected_original_dirname, "src/component/pop-up/index.html"),
        recentproduct: resolve(
          __vite_injected_original_dirname,
          "src/component/recent-product/index.html"
        ),
        login: resolve(__vite_injected_original_dirname, "src/pages/login/index.html"),
        productdetail: resolve(
          __vite_injected_original_dirname,
          "src/component/product/product-detail.html"
        ),
        addshoppingbasket: resolve(
          __vite_injected_original_dirname,
          "src/component/addShoppingBasket/addShoppingBasket.html"
        )
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx3ZWJcXFxcd2ViXFxcXHRlY2hpdC1zY2hvb2xcXFxcdmFuaWxsYS1wcm9qZWN0XFxcXGVpZ2h0LWxhbmUtaGlnaHdheVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcd2ViXFxcXHdlYlxcXFx0ZWNoaXQtc2Nob29sXFxcXHZhbmlsbGEtcHJvamVjdFxcXFxlaWdodC1sYW5lLWhpZ2h3YXlcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3dlYi93ZWIvdGVjaGl0LXNjaG9vbC92YW5pbGxhLXByb2plY3QvZWlnaHQtbGFuZS1oaWdod2F5L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJub2RlOnBhdGhcIjtcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgYnVpbGQ6IHtcclxuICAgIG91dERpcjogXCJkb2NzXCIsXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIGlucHV0OiB7XHJcbiAgICAgICAgbWFpbjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiaW5kZXguaHRtbFwiKSxcclxuICAgICAgICBoZWFkZXI6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9jb21wb25lbnQvaGVhZGVyL2hlYWRlci5odG1sXCIpLFxyXG5cclxuICAgICAgICByZWdpc3RlcjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL3BhZ2VzL3NpZ251cC9pbmRleC5odG1sXCIpLFxyXG4gICAgICAgIHByb2R1Y3RpbmZvOiByZXNvbHZlKFxyXG4gICAgICAgICAgX19kaXJuYW1lLFxyXG4gICAgICAgICAgXCJzcmMvY29tcG9uZW50L3Byb2R1Y3QvcHJvZHVjdC1pbmZvLmh0bWxcIlxyXG4gICAgICAgICksXHJcbiAgICAgICAgcHJvZHVjdDogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2NvbXBvbmVudC9wcm9kdWN0L3Byb2R1Y3QuaHRtbFwiKSxcclxuICAgICAgICBwb3B1cDogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2NvbXBvbmVudC9wb3AtdXAvaW5kZXguaHRtbFwiKSxcclxuICAgICAgICByZWNlbnRwcm9kdWN0OiByZXNvbHZlKFxyXG4gICAgICAgICAgX19kaXJuYW1lLFxyXG4gICAgICAgICAgXCJzcmMvY29tcG9uZW50L3JlY2VudC1wcm9kdWN0L2luZGV4Lmh0bWxcIlxyXG4gICAgICAgICksXHJcbiAgICAgICAgbG9naW46IHJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9wYWdlcy9sb2dpbi9pbmRleC5odG1sXCIpLFxyXG4gICAgICAgIHByb2R1Y3RkZXRhaWw6IHJlc29sdmUoXHJcbiAgICAgICAgICBfX2Rpcm5hbWUsXHJcbiAgICAgICAgICBcInNyYy9jb21wb25lbnQvcHJvZHVjdC9wcm9kdWN0LWRldGFpbC5odG1sXCJcclxuICAgICAgICApLFxyXG4gICAgICAgIGFkZHNob3BwaW5nYmFza2V0OiByZXNvbHZlKFxyXG4gICAgICAgICAgX19kaXJuYW1lLFxyXG4gICAgICAgICAgXCJzcmMvY29tcG9uZW50L2FkZFNob3BwaW5nQmFza2V0L2FkZFNob3BwaW5nQmFza2V0Lmh0bWxcIlxyXG4gICAgICAgICksXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStXLFNBQVMsZUFBZTtBQUN2WSxTQUFTLG9CQUFvQjtBQUQ3QixJQUFNLG1DQUFtQztBQUd6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixPQUFPO0FBQUEsUUFDTCxNQUFNLFFBQVEsa0NBQVcsWUFBWTtBQUFBLFFBQ3JDLFFBQVEsUUFBUSxrQ0FBVyxrQ0FBa0M7QUFBQSxRQUU3RCxVQUFVLFFBQVEsa0NBQVcsNkJBQTZCO0FBQUEsUUFDMUQsYUFBYTtBQUFBLFVBQ1g7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLFFBQ0EsU0FBUyxRQUFRLGtDQUFXLG9DQUFvQztBQUFBLFFBQ2hFLE9BQU8sUUFBUSxrQ0FBVyxpQ0FBaUM7QUFBQSxRQUMzRCxlQUFlO0FBQUEsVUFDYjtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsUUFDQSxPQUFPLFFBQVEsa0NBQVcsNEJBQTRCO0FBQUEsUUFDdEQsZUFBZTtBQUFBLFVBQ2I7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLFFBQ0EsbUJBQW1CO0FBQUEsVUFDakI7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
