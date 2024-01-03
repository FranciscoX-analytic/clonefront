import { createRouter, createWebHashHistory } from "vue-router";
import App from "../App.vue";

const routes = [
  {
    path: "",
    name: "login",
    component: () => import("../pages/Login"),
  },
  {
    path: "/",
    name: "app",
    component: App,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("../components/Dashboard.vue"),
      },
      {
        path: "/monitoreo-chancador",
        name: "monitoreochancador",
        component: () => import("../components/Chancador HPGR/hpgr.vue"),
      },
      {
        path: "/pala-cat-7495",
        name: "palacat",
        component: () => import("../components/PalaCat7495/PalaCat7495.vue"),
      },
      {
        path: "/prediccion-falla-pala",
        name: "prediccionfallapala",
        component: () =>
          import(
            "../components/PalaCat7495/PrediccionFalla/PrediccionFalla.vue"
          ),
      },
      //   {
      //     path: "/prediccion-falla-chancado",
      //     name: "prediccionfallachancado",
      //     component: () => import("../components/PrediccionFalla.vue"),
      //   },
      {
        path: "/detenciones",
        name: "detenciones",
        component: () => import("../components/dataSource/Detenciones.vue"),
      },
      {
        path: "/vibraciones",
        name: "vibraciones",
        component: () => import("../components/dataSource/Vibraciones.vue"),
      },
      {
        path: "/sensores",
        name: "sensores",
        component: () => import("../components/dataSource/Sensores.vue"),
      },
      {
        path: "/aceites",
        name: "aceites",
        component: () => import("../components/dataSource/Aceites.vue"),
      },
    ],
  },

  {
    path: "/error",
    name: "error",
    component: () => import("../pages/Error.vue"),
  },
  {
    path: "/notfound",
    name: "notfound",
    component: () => import("../pages/NotFound.vue"),
  },
  {
    path: "/access",
    name: "access",
    component: () => import("../pages/Access.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
