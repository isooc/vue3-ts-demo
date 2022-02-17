<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>风险预警</span>
        </div>
      </template>
      <div class="card-body">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="Safe" name="safe"></el-tab-pane>
          <el-tab-pane label="Progress" name="progress"></el-tab-pane>
        </el-tabs>
        <ul>
          <li v-for="(item, index) in list" :key="index">
            <span>{{ item.label }}：</span>
            <span>{{ item.value }}</span>
          </li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const activeName = ref('safe');
const handleClick = (tab: string) => {
  console.log('tab', tab);
};

const list = reactive([
  { label: '问题一', value: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX' },
  { label: '问题二', value: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX' },
  { label: '问题三', value: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX' },
  { label: '问题四', value: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX' },
]);
</script>

<style lang="scss" scoped>
.card-body {
  ul {
    height: 196px;
    overflow-y: auto;
    & > li {
      padding-bottom: 10px;
    }
  }
}
</style>
