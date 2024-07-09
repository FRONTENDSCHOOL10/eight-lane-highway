import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/eight-lane-highway/",
  build: {
    outDir: "docs",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        header: resolve(__dirname, "src/component/header/header.html"),

        register: resolve(__dirname, "src/pages/signup/index.html"),
        productinfo: resolve(
          __dirname,
          "src/component/product/product-info.html"
        ),
        product: resolve(__dirname, "src/component/product/product.html"),
        popup: resolve(__dirname, "src/component/pop-up/index.html"),
        recentproduct: resolve(
          __dirname,
          "src/component/recent-product/index.html"
        ),
        login: resolve(__dirname, "src/pages/login/index.html"),
        productdetail: resolve(
          __dirname,
          "src/component/product/product-detail.html"
        ),
        addshoppingbasket: resolve(
          __dirname,
          "src/component/addShoppingBasket/addShoppingBasket.html"
        ),
      },
    },
  },
});
