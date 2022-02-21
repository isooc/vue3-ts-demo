<template>
  <div>
    <el-row :gutter="20" class="progress-safe">
      <el-col :span="12"><progress-card :chartId="chartId"></progress-card></el-col>
      <el-col :span="12"><safe-card :chartId="chartSaveId"></safe-card></el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ProgressCard from './common/ProgressCard.vue';
import SafeCard from './common/SafeCard.vue';

const chartId = ref('constructionProgressChart');
const chartSaveId = ref('constructionSaveChart');
</script>

<style lang="scss" scoped></style>
