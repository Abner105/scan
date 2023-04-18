import { createRouter,createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/scan",
    name: "Scan",
    component: () => import("@/views/ScanView.vue"),
  }
]
const router = createRouter({
  history:createWebHashHistory(),
  routes
})
export default router