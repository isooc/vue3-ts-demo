<template>
  <div>
    <div class="header-query">
      <el-form class="form-demo" ref="formRef" :model="formData" :inline="true">
        <el-form-item label="自定义搜索">
          <el-select
            v-model="formData.value"
            multiple
            filterable
            :filter-method="methodFilter"
            placeholder="Select"
          >
            <el-option
              v-for="item in list"
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
            <el-button>重置</el-button>
            <el-button type="primary" class="float-right">新增</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="main-table">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ 'background-color': '#D3E0F5' }"
      >
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="sex" label="性别" />
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
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';

const formRef = ref();
const formData = reactive({
  value: [],
  age: '',
  sex: null,
});
let state = reactive({
  listBak: [
    { value: 'k', label: '克莱恩' },
    { value: 'd', label: '邓恩' },
    { value: 'cc', label: '梅林' },
  ],
});

interface listobj {
  value: string | number;
  label: string;
  [propName: string]: any;
}
let list: listobj[] = [...state.listBak];

interface tableObj {
  id?: number;
  name: string;
  age: number | string;
  sex: number | string;
  power: string;
  [propName: string]: any;
}
let tableData: tableObj[] = [
  { name: '克莱恩', age: '24', sex: '男', power: '占卜师' },
  { name: '邓恩', age: '38', sex: '男', power: '不眠者' },
  { name: '阿蒙', age: '1000+', sex: '未知', power: '偷盗者' },
];

const methodFilter = (value: string) => {
  let arr = [...state.listBak];
  if (value) {
    list = arr.filter((el) => {
      return el.value.includes(value) || el.label.includes(value);
    });
  } else {
    list = arr;
  }
  console.log('list:', list);
};
const edit = (value: tableObj) => {
  console.log('value', value);
};
const deleteRow = (data: tableObj) => {
  console.log('data', data);
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
