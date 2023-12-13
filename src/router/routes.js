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
        path: "/adminAddCamera",
        component: () => import("components/AdminAddCamera.vue"),
      },
      {
        path: "/adminAddMarker",
        component: () => import("components/AdminAddMarker.vue"),
      },
      {
        path: "/aboutSoft",
        component: () => import("components/AboutSoft.vue"),
      },
      {
        path: "/doc/:id",
        name: "html-doc",
        component: () => import("components/HtmlDoc.vue"),
      },
      { path: "/editor", component: () => import("components/EditorPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
