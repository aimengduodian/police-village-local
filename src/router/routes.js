const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/testFun",
        component: () => import("components/TestFunction.vue"),
      },
      {
        path: "/doc/:id",
        name: "html-doc",
        component: () => import("pages/HtmlDoc.vue"),
      },
      { path: "/editor", component: () => import("pages/EditorPage.vue") },
      {
        path: "/adminAddCamera",
        component: () => import("pages/AdminAddCamera.vue"),
      },
      {
        path: "/adminAddMarker",
        component: () => import("pages/AdminAddMarker.vue"),
      },
      {
        path: "/aboutSoft",
        component: () => import("pages/AboutSoft.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  {
    path: "/Login",
    component: () => import("pages/LoginPage.vue"),
  },
];

export default routes;
