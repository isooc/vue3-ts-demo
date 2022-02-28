<template>
  <div :class="{ hidden: hidden, position: position === 'right' }" class="pagination-container">
    <el-pagination
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :pager-count="pagerCount"
      :layout="layout"
      :total="total"
      :page-sizes="pageSizes"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance()!;
const props = defineProps({
  // 显示分页个数
  pagerCount: {
    type: Number,
    default: 7,
  },
  total: {
    required: true,
    type: Number,
  },
  page: {
    type: Number,
    default: 1,
  },
  limit: {
    type: Number,
    default: 20,
  },
  pageSizes: {
    type: Array,
    default() {
      return [10, 20, 30, 50];
    },
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper',
  },
  background: {
    type: Boolean,
    default: false,
  },
  autoScroll: {
    type: Boolean,
    default: true,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
  // 显示位置：参数：left,right ; 默认是left
  position: {
    type: String,
    default: 'left',
  },
});
const currentPage = computed({
  get() {
    return props.page;
  },
  set(val) {
    proxy?.$emit('update:page', val);
  },
});
const pageSize = computed({
  get() {
    return props.limit;
  },
  set(val) {
    proxy?.$emit('update:limit', val);
  },
});

const handleSizeChange = (val: number) => {
  proxy?.$emit('pagination', { page: currentPage.value, limit: val });
};
const handleCurrentChange = (val: number) => {
  proxy?.$emit('pagination', { page: val, limit: pageSize.value });
};
</script>

<style lang="scss" scoped>
.pagination-container {
  margin-top: 10px;
}
.position {
  text-align: center;
}
</style>
