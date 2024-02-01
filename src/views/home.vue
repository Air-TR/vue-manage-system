<template>
  <v-header />
  <v-sidebar />
  <div class="content-box" :class="{ 'content-collapse': sidebar.collapse }">
    <v-tags></v-tags>
    <div class="content">
      <!-- 2023-02-23 被废弃，原因是使用 iframe 后，router 再跳转页面就空白页 -->
      <!-- <router-view v-slot="{ Component }">
				<transition name="move" mode="out-in">
					<keep-alive :include="tags.nameList">
						<component :is="Component"></component>
					</keep-alive>
				</transition>
			</router-view> -->

      <!-- 2023-02-23 改造，修复进入 iframe 页面后，router 再跳转页面就变成空白页问题 -->
      <router-view />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useSidebarStore } from "../store/sidebar";
import { useTagsStore } from "../store/tags";
import vHeader from "../components/header.vue";
import vSidebar from "../components/sidebar.vue";
import vTags from "../components/tags.vue";

const sidebar = useSidebarStore();
const tags = useTagsStore();
</script>
