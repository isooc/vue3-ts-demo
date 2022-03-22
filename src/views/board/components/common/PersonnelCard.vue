<template>
  <div class="personnel-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>人员预览</span>
        </div>
      </template>
      <div class="card-body">
        <div class="body-item" v-for="(item, index) in list" :key="index">
          <p class="item-label">{{ item.label }}</p>
          <p class="item-value">{{ item.value }}</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from '@vue/reactivity';

const list = reactive([
  { label: '在场施工队', value: 3 },
  { label: '在场班组', value: 5 },
  { label: '在场工人', value: 35 },
  { label: '离场施工队', value: 3 },
  { label: '离场班组', value: 5 },
  { label: '离场工人', value: 24 },
]);
</script>

<style lang="scss" scoped>
.personnel-container {
  height: 100%;
  .el-card {
    height: calc(100% - 2px);
  }
  &:deep(.el-card__body) {
    // vue3 deep写法
    padding: 20px 0 !important;
  }
}
.card-body {
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  row-gap: 20px;
  height: 180px;
  text-align: center;
  .body-item {
    align-items: center;
    &:not(:last-child):not(:nth-child(3)) {
      border-right: 1px solid #ccc;
    }
  }
}
</style>
