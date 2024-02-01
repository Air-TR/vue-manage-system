<template>
  <el-button type="" @click="getList">getList</el-button>
  <el-table v-loading="loading" :data="checkLogList" :border="true">
    <el-table-column :label="item" v-for="(item, index) in header">
      <template slot-scope="scope">
        <div v-for="(item, itemIdx) in scope.row">
          <span v-for="(item2, index2) in item" v-if="index2 == index">
            {{ item[index2] }}
          </span>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { ref } from "vue";

let loading = ref(false);
let wideTable = ref(false);
let header = ref();
let checkLogList = ref();

const getList = () => {
  loading.value = true;
  wideTable.value = true;
  header.value = [];
  checkLogList.value = [
    // { header: ["", "第一季度", "第二季度", "第三季度", "第四季度"] },
    { countd: ["户数", "1", "2", "3", "4"] },
    { countp: ["包数", "5", "6", "7", "8"] },
    { principalPrice: ["本金金额", "9", "10", "11", "12"] },
  ];
  header.value = ["", "第一季度", "第二季度", "第三季度", "第四季度"];
  loading.value = false;
};

// const labelHead = (h, { column, index }) => {
//   //动态表头渲染
//   //let l = column.label.length;
//   //let f = 12; //每个字大小,其实是每个字的比例值,大概会比字体大小打差不多大
//   //column.minWidth = f * l; //字大小乘个数即长度 ,注意不要加px像素，这里minWidth只是一个比例值，不是真正的长度
//   //然后将列标题放在一个div块中，注意块的宽度一定要100%，否则表格显示不完全
//   return h("span", { class: "table-head", style: { width: "100%" } }, [
//     column.label,
//   ]);
// };
</script>
