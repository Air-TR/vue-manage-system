<template>
  <div class="AirSearch">
    <h2>Air-Search</h2>
    <br />
    <el-input
      v-model="searchInput"
      style="width: 30%"
      @keydown.enter="search"
    />
    <el-button id="searchButton" type="primary" icon="Search" @click="search"
      >Search</el-button
    >
    <p>© www.tr.com 2023</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const searchInput = ref("");

const search = () => {
  if (searchInput.value.trim()) {
    // window.location.href = "https://www.baidu.com/s?wd=" + searchInput.value; // 本标签页打开
    window.open("https://www.baidu.com/s?wd=" + searchInput.value); // 新标签页打开
  }
};
</script>

<style scoped>
.AirSearch {
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  background-size: 100%;
  /* background-image: url(../assets/img/mac.jpg); */
  background-image: linear-gradient(to right, powderblue, pink, plum);
}

h2 {
  color: #f00;
  font-family: Times New Roman;
  margin-top: 10%;
}
#searchButton {
  margin-left: 3px;
}
p {
  color: #aaa;
  margin-top: 25%;
}
</style>
