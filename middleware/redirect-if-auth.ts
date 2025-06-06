import { navigateTo } from "#app";

export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      return navigateTo("/menu");
    }
  }
});
