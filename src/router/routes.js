const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/addmsg",
        component: () => import("components/LeafletCarmerMarker.vue"),
      },
      {
        path: "/testFun",
        component: () => import("components/TestFunction.vue"),
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
