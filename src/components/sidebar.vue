<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="sidebar.collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-sub-menu
            :index="item.index"
            :key="item.index"
            v-permiss="item.permiss"
          >
            <template #title>
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-sub-menu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
                v-permiss="item.permiss"
              >
                <template #title>{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >
                  {{ threeItem.title }}
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item
                v-else
                :index="subItem.index"
                v-permiss="item.permiss"
              >
                {{ subItem.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item
            :index="item.index"
            :key="item.index"
            v-permiss="item.permiss"
          >
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSidebarStore } from "../store/sidebar";
import { useRoute } from "vue-router";

const items = [
  {
    icon: "Odometer",
    index: "/dashboard",
    title: "系统首页",
    permiss: "1",
  },
  {
    icon: "Calendar",
    index: "1",
    title: "表格相关",
    permiss: "2",
    subs: [
      {
        index: "/webSql",
        title: "Web-SQL",
        permiss: "2",
      },
      {
        index: "/table",
        title: "常用表格",
        permiss: "2",
      },
      {
        index: "/import",
        title: "导入Excel",
        permiss: "2",
      },
      {
        index: "/export",
        title: "导出Excel",
        permiss: "2",
      },
      {
        index: "/softLicense",
        title: "软件授权",
        permiss: "2",
      },
    ],
  },
  {
    icon: "DocumentCopy",
    index: "/tabs",
    title: "tab选项卡",
    permiss: "3",
  },
  {
    icon: "Edit",
    index: "3",
    title: "表单相关",
    permiss: "4",
    subs: [
      {
        index: "/form",
        title: "基本表单",
        permiss: "5",
      },
      {
        index: "/upload",
        title: "文件上传",
        permiss: "6",
      },
      {
        index: "4",
        title: "三级菜单",
        permiss: "7",
        subs: [
          {
            index: "/editor",
            title: "富文本编辑器",
            permiss: "8",
          },
          {
            index: "/markdown",
            title: "markdown编辑器",
            permiss: "9",
          },
        ],
      },
    ],
  },
  {
    icon: "Setting",
    index: "/icon",
    title: "自定义图标",
    permiss: "10",
  },
  {
    icon: "PieChart",
    index: "/charts",
    title: "schart图表",
    permiss: "11",
  },
  {
    icon: "Setting",
    index: "5",
    title: "系统相关",
    permiss: "12",
    subs: [
      {
        index: "/permission",
        title: "权限管理",
        permiss: "12",
      },
      {
        index: "/404",
        title: "404",
      },
      {
        index: "/403",
        title: "403",
      },
    ],
  },
  {
    icon: "StarFilled",
    index: "6",
    title: "Air",
    permiss: "1",
    subs: [
      {
        index: "/airSearch",
        title: "Air-Search",
        permiss: "1",
      },
      {
        index: "/airSearch-Snowflake",
        title: "AirSearch-Snowflake",
        permiss: "1",
      },
      {
        index: "/3DSliderPic",
        title: "3D 悬浮图片",
        permiss: "1",
      },
      {
        index: "/3DCyclePic",
        title: "3D 环形图片",
        permiss: "1",
      },
      {
        index: "/3DEarth",
        title: "3D 地球",
        permiss: "1",
      },
      {
        index: "/map",
        title: "高德地图",
        permiss: "1",
      },
      {
        index: "/waveBackground",
        title: "渐变波浪背景",
        permiss: "1",
      },
      {
        index: "/gradientColor",
        title: "渐变调色板",
        permiss: "1",
      },
      {
        index: "/music-player",
        title: "音乐播放器",
        permiss: "1",
      },
    ],
  },
  {
    icon: "MagicStick",
    index: "7",
    title: "其他",
    permiss: "1",
    subs: [
      {
        index: "/multiSearch",
        title: "多种搜索",
        permiss: "1",
      },
      {
        index: "/air-search-auto-tip",
        title: "搜索自动提示",
        permiss: "1",
      },
      {
        index: "/snowflake",
        title: "雪花",
        permiss: "1",
      },
      {
        index: "/mapDragPlanRoute",
        title: "地图-拖拽规划路线",
        permiss: "1",
      },
    ],
  },
  // {
  //     icon: 'CoffeeCup',
  //     index: '/donate',
  //     title: '支持作者',
  //     permiss: '14',
  // },
];

const route = useRoute();
const onRoutes = computed(() => {
  return route.path;
});

const sidebar = useSidebarStore();
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
