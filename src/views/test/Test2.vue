<template>
  <div>
    <div class="header-query">
      <el-form class="form-demo" ref="formRef" :model="formData" :inline="true">
        <el-form-item label="自定义搜索">
          <el-select v-model="formData.value" multiple placeholder="Select">
            <el-option
              v-for="item in state.list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: var(--el-text-color-secondary); font-size: 13px">{{
                item.value
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="formData.age" placeholder="Input"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="formData.sex">
            <el-option label="男" :value="1">男</el-option>
            <el-option label="女" :value="0">女</el-option>
            <el-option label="未知" :value="2">未知</el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="query-btn">
            <el-button type="primary">查询</el-button>
            <el-button @click="reset">重置</el-button>
            <el-button type="primary" class="float-right">新增</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="main-table">
      <el-table
        :data="state.tableData"
        style="width: 100%"
        :header-cell-style="{ 'background-color': '#D3E0F5' }"
      >
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="sexDec" label="性别" />
        <el-table-column prop="power" label="能力体系">
          <template #default="scope">
            {{ scope.row.power }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteRow(scope.row, scope.row.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="test-dialog">
      <dialog-test
        :id="dialogId"
        :dialogTitle="dialogTitle"
        :dialogVisible="dialogVisible"
        :dialogData="state.dialogData"
        @closeDialog="closeDialog"
      ></dialog-test>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRef } from 'vue';
import DialogTest from './components/DialogTest.vue';

const formRef = ref();
const formData = reactive({
  value: [],
  age: '',
  sex: null,
});

interface tableObj {
  id?: number;
  name: string;
  age: number | string;
  sex: number | string;
  power: string;
  [propName: string]: any;
}

const dialogTitle = ref('');
const dialogVisible = ref(false);
const dialogId = ref('');
const state = reactive({
  list: [
    { value: 'k', label: '克莱恩' },
    { value: 'd', label: '邓恩' },
    { value: 'cc', label: '梅林' },
  ],
  tableData: [
    { id: 1, name: '克莱恩', age: '24', sexDec: '男', sex: 1, power: '占卜师' },
    { id: 2, name: '邓恩', age: '38', sexDec: '男', sex: 1, power: '不眠者' },
    { id: 3, name: '阿蒙', age: '1000+', sexDec: '未知', sex: 2, power: '偷盗者' },
  ],
  dialogData: {},
});

const edit = (value: tableObj) => {
  dialogVisible.value = true;
  dialogId.value = value.id;
  dialogTitle.value = '编辑';
  state.dialogData = value;
};
const deleteRow = (data: tableObj) => {
  console.log('data', data);
};
const closeDialog = () => {
  dialogVisible.value = false;
  state.dialogData = {};
};
const reset = () => {
  formData.value = [];
  formData.age = '';
  formData.sex = null;
};

onMounted(() => {
  //
});
</script>

<style lang="scss" scoped>
.header-query {
  .form-demo {
    .query-btn {
      margin-left: 20px;
    }
  }
  .el-select {
    width: 100%;
  }
}
</style>
