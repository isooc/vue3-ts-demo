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
        <my-echarts
          :chartOptions="chartOptions"
          :chartId="chartData.chartId"
          :style="chartStyle"
        ></my-echarts>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import MyEcharts from '@/components/MyEcharts.vue';
import { reactive, defineProps } from 'vue';

const props = defineProps({
  chartData: {
    type: Object,
    default: () => {
      return {
        chartId: '',
        xData: [] as string[],
        yData: {},
      };
    },
  },
  chartStyle: {
    type: Object,
    defaylt: () => {
      return { height: '250px' };
    },
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
    data: props.chartData.xData,
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '实际进度',
      type: 'line',
      stack: 'Total',
      data: props.chartData.yData.actual,
    },
    {
      name: '预计进度',
      type: 'line',
      stack: 'Total',
      data: props.chartData.yData.estimated,
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
