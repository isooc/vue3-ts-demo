<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ title }}</span>
        </div>
      </template>
      <div class="card-body">
        <div class="table-header row-spacer">
          <div v-for="(item, index) in headers" :key="index">
            <div class="label">{{ item.label }}</div>
            <div class="value">{{ item.value }}</div>
          </div>
        </div>
        <div class="table-body">
          <base-table
            :list="tableList"
            :columns="columns"
            :total="total"
            :page="page.pageNow"
            :rows="page.pageSize"
          ></base-table>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import BaseTable from '@/components/BaseTable.vue';

defineProps({
  title: {
    type: String,
    default: '',
  },
  headers: {
    type: Array as any,
    default: () => [],
  },
  tableList: {
    type: Array as any,
    default: () => [],
  },
  columns: {
    type: Array as any,
    default: () => [],
  },
  total: {
    type: Number,
    default: 0,
  },
  page: {
    type: Object,
  },
});
</script>

<style lang="scss" scoped>
.table-body {
  padding: 0 20px;
}
</style>
