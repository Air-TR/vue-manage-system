import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { usePermissStore } from "../store/permiss";
import Home from "../views/home.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          title: "系统首页",
          permiss: "1",
        },
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "../views/dashboard.vue"),
      },
      {
        path: "/table",
        name: "basetable",
        meta: {
          title: "表格",
          permiss: "2",
        },
        component: () =>
          import(/* webpackChunkName: "table" */ "../views/table.vue"),
      },
      {
        path: "/charts",
        name: "basecharts",
        meta: {
          title: "图表",
          permiss: "11",
        },
        component: () =>
          import(/* webpackChunkName: "charts" */ "../views/charts.vue"),
      },
      {
        path: "/form",
        name: "baseform",
        meta: {
          title: "表单",
          permiss: "5",
        },
        component: () =>
          import(/* webpackChunkName: "form" */ "../views/form.vue"),
      },
      {
        path: "/tabs",
        name: "tabs",
        meta: {
          title: "tab标签",
          permiss: "3",
        },
        component: () =>
          import(/* webpackChunkName: "tabs" */ "../views/tabs.vue"),
      },
      {
        path: "/donate",
        name: "donate",
        meta: {
          title: "鼓励作者",
          permiss: "14",
        },
        component: () =>
          import(/* webpackChunkName: "donate" */ "../views/donate.vue"),
      },
      {
        path: "/permission",
        name: "permission",
        meta: {
          title: "权限管理",
          permiss: "13",
        },
        component: () =>
          import(
            /* webpackChunkName: "permission" */ "../views/permission.vue"
          ),
      },
      {
        path: "/upload",
        name: "upload",
        meta: {
          title: "上传插件",
          permiss: "6",
        },
        component: () =>
          import(/* webpackChunkName: "upload" */ "../views/upload.vue"),
      },
      {
        path: "/icon",
        name: "icon",
        meta: {
          title: "自定义图标",
          permiss: "10",
        },
        component: () =>
          import(/* webpackChunkName: "icon" */ "../views/icon.vue"),
      },
      {
        path: "/user",
        name: "user",
        meta: {
          title: "个人中心",
        },
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/user.vue"),
      },
      {
        path: "/editor",
        name: "editor",
        meta: {
          title: "富文本编辑器",
          permiss: "8",
        },
        component: () =>
          import(/* webpackChunkName: "editor" */ "../views/editor.vue"),
      },
      {
        path: "/markdown",
        name: "markdown",
        meta: {
          title: "markdown编辑器",
          permiss: "9",
        },
        component: () =>
          import(/* webpackChunkName: "markdown" */ "../views/markdown.vue"),
      },
      {
        path: "/export",
        name: "export",
        meta: {
          title: "导出Excel",
          permiss: "2",
        },
        component: () =>
          import(/* webpackChunkName: "export" */ "../views/export.vue"),
      },
      {
        path: "/import",
        name: "import",
        meta: {
          title: "导入Excel",
          permiss: "2",
        },
        component: () =>
          import(/* webpackChunkName: "import" */ "../views/import.vue"),
      },
      {
        path: "/403",
        name: "403",
        meta: {
          title: "没有权限",
        },
        component: () =>
          import(/* webpackChunkName: "403" */ "../views/403.vue"),
      },
      {
        path: "/404",
        name: "404",
        meta: {
          title: "404",
        },
        component: () =>
          import(/* webpackChunkName: "404" */ "../views/404.vue"),
      },
      {
        path: "/3DSliderPic",
        name: "3DSliderPic",
        meta: {
          title: "3D 悬浮图片",
        },
        component: () => import("../air/3DSliderPic.vue"),
      },
      {
        path: "/3DCyclePic",
        name: "3DCyclePic",
        meta: {
          title: "3D 环形图片",
        },
        component: () => import("../air/3DCyclePic.vue"),
      },
      {
        path: "/3DEarth",
        name: "3DEarth",
        meta: {
          title: "3D 地球",
        },
        component: () => import("../air/3DEarth.vue"),
      },
      {
        path: "/multiSearch",
        name: "MultiSearch",
        meta: {
          title: "MultiSearch",
        },
        component: () => import("../air/MultiSearch.vue"),
      },
      {
        path: "/airSearch",
        name: "AirSearch",
        meta: {
          title: "Air-Search",
        },
        component: () => import("../air/AirSearch.vue"),
      },
      {
        path: "/airSearch-Snowflake",
        name: "AirSearchSnowflake",
        meta: {
          title: "AirSearch-Snowflake",
        },
        component: () => import("../air/AirSearchSnowflake.vue"),
      },
      {
        path: "/snowflake",
        name: "Snowflake",
        meta: {
          title: "Snowflake",
        },
        component: () => import("../air/Snowflake.vue"),
      },
      {
        path: "/map",
        name: "Map",
        meta: {
          title: "地图",
        },
        component: () => import("../air/Map.vue"),
      },
      {
        path: "/waveBackground",
        name: "WaveBackground",
        meta: {
          title: "渐变波浪背景",
        },
        component: () => import("../air/WaveBackground.vue"),
      },
      {
        path: "/gradientColor",
        name: "GradientColor",
        meta: {
          title: "渐变调色板",
        },
        component: () => import("../air/GradientColor.vue"),
      },
      {
        path: "/music-player",
        name: "MusicPlayer",
        meta: {
          title: "音乐播放器",
        },
        component: () => import("../air/MusicPlayer.vue"),
      },
      {
        path: "/air-search-auto-tip",
        name: "AirSearchAutoTip",
        meta: {
          title: "AirSearchAutoTip",
        },
        component: () => import("../air/AirSearchAutoTip.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | vue-manage-system`;
  const role = localStorage.getItem("ms_username");
  const permiss = usePermissStore();
  if (!role && to.path !== "/login") {
    next("/login");
  } else if (to.meta.permiss && !permiss.key.includes(to.meta.permiss)) {
    // 如果没有权限，则进入403
    next("/403");
  } else {
    next();
  }
});

export default router;
