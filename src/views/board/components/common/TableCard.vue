<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>进度预览</span>
        </div>
      </template>
      <div class="card-body">
        <div class="table-header row-spacer">
          <div v-for="(item, index) in headers" :key="index">
            <div class="label">{{ item.label }}</div>
            <div class="value">{{ item.value }}</div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
defineProps({
  headers: {
    type: Array as any,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped></style>
