<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-select placeholder="用户类型" class="handle-select mr10">
          <el-option key="1" label="个人" value="个人"></el-option>
          <el-option key="2" label="企业" value="企业"></el-option>
          <el-option key="3" label="学校" value="学校"></el-option>
        </el-select>
        <el-select placeholder="授权类型" class="handle-select mr10">
          <el-option key="1" label="永久" value="永久"></el-option>
          <el-option key="2" label="期限" value="期限"></el-option>
        </el-select>
        <el-input
          placeholder="软件名称 / 授权用户 / 授权类型值"
          class="handle-input mr10"
        ></el-input>
        <el-button type="primary" :icon="Search" @click="handleSearch"
          >搜索</el-button
        >
        <el-button type="primary" :icon="Plus" @click="addLicense"
          >新增</el-button
        >
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="softwareName" label="软件名称" width="180" />
        <el-table-column prop="licenseUser" label="授权用户" width="180" />
        <el-table-column prop="userType" label="用户类型" width="180" />
        <el-table-column prop="expireDate" label="授权截止日期" />
        <el-table-column prop="licenseType" label="授权类型" />
        <el-table-column prop="licenseValue" label="授权类型值" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button
              text
              :icon="View"
              @click="handleEdit(scope.$index, scope.row)"
            >
              详情
            </el-button>
            <el-button
              text
              :icon="Delete"
              class="red"
              @click="handleDelete(scope.$index)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="1"
          :page-size="10"
          :total="3"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="软件授权" v-model="editVisible" width="30%">
      <el-form label-width="100px">
        <el-form-item label="软件名称">
          <el-input v-model="form.softwareName" :disabled="readonly"></el-input>
        </el-form-item>
        <el-form-item label="授权用户">
          <el-input v-model="form.licenseUser" :disabled="readonly"></el-input>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-input v-model="form.userType" :disabled="readonly"></el-input>
        </el-form-item>
        <el-form-item label="授权截止日期">
          <el-input v-model="form.expireDate" :disabled="readonly"></el-input>
        </el-form-item>
        <el-form-item label="授权类型">
          <el-input v-model="form.licenseType" :disabled="readonly"></el-input>
        </el-form-item>
        <el-form-item label="授权类型值">
          <el-input v-model="form.licenseValue" :disabled="readonly"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="form.createTime" :disabled="readonly"></el-input>
        </el-form-item>
        <el-form-item label="授权码">
          <el-input
            v-model="form.licenseCode"
            type="textarea"
            :disabled="readonly"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Delete, View, Search, Plus } from "@element-plus/icons-vue";
import { fetchData } from "../api/index";
import { tr } from "element-plus/es/locale";

const tableData = [
  {
    softwareName: "微信",
    licenseUser: "张三",
    userType: "个人",
    expireDate: "2024-10-01",
    licenseType: "机器码",
    licenseValue: "FB931BF23",
    createTime: "2023-07-28 09:15:20",
    licenseCode:
      "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgaU8zmpgNxarJWl/6KfhP90jiSZFXirRXnUxv56ZYECkCLNCZXoS3dQN4Yz0GMUk+ujKJNntNHE7c51vE1Df9NbkvFQEmCcQsXtYLZG6/CgZvibBuRKfg/124yyKVQbnfvl9MCaWx6yapVK7DP9pGHlgvNDhCZL4m3u2ajdRArp5IwU7QDpIobtJ/mj9qgkFZO4pnZ0tNODBap9WJQsE8J/8aZIHCZcILzXD4gTS88VQ/RZ6Gml44CVbe71KRlDnIRGdikuuG3eNtS0D08UHBKkGk+hx4oECHDgEXUEoxg+4v+o/kDY//JhKw/CZM3GCwruAgNroIH2ywtwFRTI1GQIDAQAB",
  },
  {
    softwareName: "支付宝",
    licenseUser: "科大讯飞",
    userType: "企业",
    expireDate: "2025-12-31",
    licenseType: "Mac 地址",
    licenseValue: "00-1A-2B-3C-4D-56",
    createTime: "2023-07-28 09:18:53",
    licenseCode:
      "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsi21oniPQAD+JunAfkMXXjLO+fW0aS+XKdy0C0/PkMFLyhM7z0mPa419Qcno6N26EbJk1DXebATANvGNHXDo9w1TNUBJVV1SlUOCHQGmiU80mEongm82ntFQwSn+4cVV4jQMGHZFTfFyXvjiE0fEFODsMzgMhl3sB/lFSfXb7L+X8USTF3kqTsYkWcUnkmfEFBal7b/4am/vnMa7SYrjVCpVnYVK5qfXRvdNB/tHydpEjW7KHwAGZAWqPpdllMB6kHVp0USEyTxEW+8wftFCawBZA+Xn+zsJGJwuDjMNE9+OpcNWtDfr3aJvf0m8hCHkEAfu4XI1ItlmecOZxXJ35wIDAQAB",
  },
  {
    softwareName: "QQ",
    licenseUser: "苏州大学",
    userType: "学校",
    expireDate: "永久",
    licenseType: "设备号",
    licenseValue: "GSS188",
    createTime: "2023-07-28 09:20:33",
    licenseCode:
      "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4KDBpsy9Zj0+MvR6D/fBnqYNlzlnUxI/MLebIvtxWgnRjPk+FROuQfsn5++dp3/1Mhhl/CXo2qfmLsUwYZt+Wj/PDmK/GaZHxO22qjAwRBvLnESFZm1BUGy0DaE+uLOUZGx/qg0UHn634+zvbjfeBnI6jpgFpVcMPgKny9fSBUH9s3L+4O2AkkCbZ7uIJb/YHqMz7LsuEPt3lP4vY4w/yOKRhbot3x9tsbvARKiUkzl8FugAlpha6049gUcCLLMDR/YtRXU84ek49i9FM0omevw1+ZEXM11wjjZ2n0LNSioOEPVRNndsikFYob2pCOkLVhS7P8OGymBqv9yZiOc7bwIDAQAB",
  },
];

const handleSearch = () => {};

const handlePageChange = () => {};

const handleDelete = (index: number) => {
  ElMessageBox.confirm("确定要删除吗？", "提示", {
    type: "warning",
  })
    .then(() => {
      ElMessage.success("删除成功");
    })
    .catch(() => {});
};

const editVisible = ref(false);

const readonly = ref(false);

const saveEdit = () => {};

let form = reactive({
  softwareName: "",
  licenseUser: "",
  userType: "",
  expireDate: "",
  licenseType: "",
  licenseValue: "",
  createTime: "",
  licenseCode: "",
});

const handleEdit = (index: number, row: any) => {
  form.softwareName = row.softwareName;
  form.licenseUser = row.licenseUser;
  form.userType = row.userType;
  form.expireDate = row.expireDate;
  form.licenseType = row.licenseType;
  form.licenseValue = row.licenseValue;
  form.createTime = row.createTime;
  form.licenseCode = row.licenseCode;
  editVisible.value = true;
  readonly.value = true;
};

const addLicense = () => {
  form.softwareName = "";
  form.licenseUser = "";
  form.userType = "";
  form.expireDate = "";
  form.licenseType = "";
  form.licenseValue = "";
  form.createTime = "";
  form.licenseCode = "";
  editVisible.value = true;
  readonly.value = false;
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #f56c6c;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}

::v-deep .el-textarea__inner {
  height: 150px;
}
</style>
