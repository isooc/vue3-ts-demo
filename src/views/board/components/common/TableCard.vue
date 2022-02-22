<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ tableCardData.title }}</span>
          <slot v-if="tableCardData.titleSlot" name="titleSlot" class="title-slot"></slot>
        </div>
      </template>
      <div class="card-body">
        <div v-if="!tableCardData.headerSlot" class="table-header row-spacer">
          <div v-for="(item, index) in tableCardData.headers" :key="index">
            <div class="label">{{ item.label }}</div>
            <div class="value">{{ item.value }}</div>
          </div>
        </div>
        <div v-if="tableCardData.headerSlot">
          <slot name="headerSlot"></slot>
        </div>
        <div class="table-body">
          <base-table
            :list="tableCardData.tableList"
            :columns="tableCardData.columns"
            :total="tableCardData.total"
            :page="tableCardData.page.pageNow"
            :rows="tableCardData.page.pageSize"
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
  tableCardData: {
    type: Object as any,
    default: () => {
      return {
        title: '',
        headers: [],
        tableList: [],
        columns: [],
        total: 0,
        page: {},
        titleSlot: false,
        headerSlot: false,
      };
    },
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-card__body) {
  // vue3 deep写法
  padding: 20px 0 !important;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title-slot {
  }
}

.table-body {
  padding: 0 20px;
}
</style>
