<template>
  <div id="container"></div>
</template>

<script setup>
// 添加高德安全密钥
window._AMapSecurityConfig = {
  securityJsCode: "e9a4377597f4a58e444909fe83dd69c9",
};

import { onMounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { shallowRef } from "@vue/reactivity";
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();

const map = shallowRef(null);

const initMap = () => {
  AMapLoader.load({
    key: "7411dd57464e4b12ee621b6f5442e3c9", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.ToolBar", "AMap.Driving"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    AMapUI: {
      version: "1.1",
      plugins: [],
    },
    Loca: {
      version: "2.0",
    },
  })
    .then((AMap) => {
      // 基础地图加载，container 与 #div 对应
      proxy.map = new AMap.Map("container", {
        viewMode: "2D", // 2D（默认），3D
        zoom: 12, // 初始化地图级别，从1开始，1是世界地图
        resizeEnable: true,
        // center: [105.602725, 37.076636], // 初始化地图中心点位置，不设置会以当前 IP 所在地为中心点
      });

      AMap.plugin("AMap.Driving", function () {
        var driving = new AMap.Driving({
          // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
          policy: AMap.DrivingPolicy.LEAST_TIME,
          map: proxy.map,
          panel: "panel",
        });

        console.log("driving", driving);

        // var points = [
        //   { keyword: "东方之门", city: "苏州" },
        //   { keyword: "苏州站", city: "苏州" },
        // ];

        // var opts = {
        //   // 途经点参数，最多支持传入16个途经点
        //   waypoints: [{ keyword: "石湖景区", city: "苏州" }],
        // };

        // console.log(111);
        // driving.search(points, opts, function (status, result) {
        //   console.log(222);
        //   console.log("status", status);
        //   console.log("result", result);
        //   // 未出错时，result即是对应的路线规划方案
        // });
        // console.log(333);

        // 根据起终点名称规划驾车导航路线
        driving.search(
          [
            { keyword: "苏州中心", city: "苏州" },
            { keyword: "苏州站", city: "苏州" },
          ],
          function (status, result) {
            console.log("status", status);
            console.log("result", result);
            // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
            if (status === "complete") {
              // log.success("绘制驾车路线完成");
            } else {
              // log.error("获取驾车数据失败：" + result);
            }
          }
        );
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
