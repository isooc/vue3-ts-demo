<template>
  <div :id="chartId" class="chart"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { defineProps, onMounted } from 'vue';

const props = defineProps({
  chartOptions: {
    type: Object,
    required: true,
  },
  chartId: {
    type: String,
  },
});

const initChart = () => {
  const myChart = echarts.init(document.getElementById(props.chartId as string) as HTMLElement);
  myChart.setOption(props.chartOptions);
};

onMounted(() => {
  initChart();
});
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 250px;
}
</style>
