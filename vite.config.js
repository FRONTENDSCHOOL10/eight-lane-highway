import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "docs",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        header: resolve(__dirname, "src/component/header/header.html"),
        footer: resolve(__dirname, "src/component/footer/footer.html"),
        register: resolve(__dirname, "src/pages/register/index.html"),
        productinfo: resolve(
          __dirname,
          "src/component/product/product-info.html"
        ),
        product: resolve(__dirname, "src/component/product/product.html"),
        productslide: resolve(
          __dirname,
          "src/component/product/product-slide.html"
        ),
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
        banner: resolve(__dirname, "src/component/banner/banner.html"),
        cart: resolve(__dirname, "src/pages/cart/index.html"),
        productList: resolve(__dirname, "src/pages/productList/index.html"),
      },
    },
  },
});
