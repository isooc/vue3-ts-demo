<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>安全预览</span>
        </div>
      </template>
      <div class="card-body">
        <div class="body-header">
          <div>
            <span class="header-value">35</span>
            <span class="header-label">在场实名人数</span>
          </div>
          <div>
            <span class="header-value">30</span>
            <span class="header-label">在场安全教育及技术交底人数</span>
          </div>
          <div>
            <span class="header-value">20</span>
            <span class="header-label">在场保险人数</span>
          </div>
        </div>
        <div class="body-chart">
          <my-echarts
            :chartOptions="chartOptions"
            :chartId="chartData.chartId"
            :style="chartStyle"
          ></my-echarts>
        </div>
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

const chartOptions = reactive({
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    top: '20px',
    left: '40px',
    right: '20px',
    bottom: '20px',
  },
  xAxis: {
    type: 'category',
    data: props.chartData.xData,
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      type: 'bar',
      barWidth: '10%',
      data: [35, 30, 20],
    },
  ],
});
</script>

<style lang="scss" scoped>
.body-header {
  display: grid;
  grid-template-columns: 25% 50% 25%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  > div {
    .header-value {
      font-size: 24px;
    }
    .header-label {
      display: inline-block;
      padding-left: 10px;
      font-size: 12px;
      color: #999;
    }
    &:not(:last-child) {
      border-right: 1px solid #ccc;
    }
  }
}
</style>
