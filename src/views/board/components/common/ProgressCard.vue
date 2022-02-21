<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>进度预览</span>
        </div>
      </template>
      <div class="card-body">
        <el-date-picker
          v-model="dateValue"
          type="year"
          class="date-picker"
          placeholder="请选择"
        ></el-date-picker>
        <my-echarts :chartOptions="chartOptions" :chartId="chartId"></my-echarts>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import MyEcharts from '@/components/MyEcharts.vue';
import { reactive, defineProps } from 'vue';

defineProps({
  chartId: {
    type: String,
    default: '',
  },
});

const dateValue = String(new Date().getFullYear());

const chartOptions = reactive({
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['预计进度', '实际进度'],
  },
  grid: {
    left: '40px',
    right: '20px',
    bottom: '20px',
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '实际进度',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210, 180, 157, 149, 129, 90],
    },
    {
      name: '预计进度',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310, 280, 268, 210, 190, 200],
    },
  ],
});
// const chartId = ref('progress-echart');
</script>

<style lang="scss" scoped>
.card-body {
  position: relative;
  &:deep(.date-picker) {
    z-index: 999;
    position: absolute;
    right: 20px;
    width: 100px !important;
  }
}
</style>
