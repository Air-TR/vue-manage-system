<template>
  <div id="container"></div>
</template>

<script setup>
import { onMounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { shallowRef } from "@vue/reactivity";

const map = shallowRef(null);

const initMap = () => {
  AMapLoader.load({
    key: "7411dd57464e4b12ee621b6f5442e3c9", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [""], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      // 基础地图加载，container 与 #div 对应
      map = new AMap.Map("container", {
        // viewMode: "3D", // 2D（默认），3D
        zoom: 10, // 初始化地图级别，从1开始，1是世界地图
        // center: [105.602725, 37.076636], // 初始化地图中心点位置，不设置会以当前 IP 所在地为中心点
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

onMounted(() => {
  initMap();
});
</script>

<style scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
}
</style>
