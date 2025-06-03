import { navigateTo } from "#app";

export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      return navigateTo({
        path: "/unauthorized",
        query: {
          statusCode: 401,
          message:
            "Anda tidak memiliki akses pada halaman ini. Silakan login terlebih dahulu!",
        },
      });
    }
  }
});
