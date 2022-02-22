<template>
  <div>
    <el-row :gutter="20" class="progress-safe">
      <el-col :span="12"><progress-card :chartData="chartProgressData"></progress-card></el-col>
      <el-col :span="12"
        ><safe-card :chartData="chartSafeData" :chartStyle="safeChartStyle"></safe-card
      ></el-col>
    </el-row>
    <el-row :gutter="20" class="table-card">
      <el-col :span="12">
        <table-card :tableCardData="laborTableData"></table-card>
      </el-col>
      <el-col :span="12">
        <table-card :tableCardData="taskTableData"></table-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import ProgressCard from './common/ProgressCard.vue';
import SafeCard from './common/SafeCard.vue';
import TableCard from './common/TableCard.vue';

const chartProgressData = reactive({
  chartId: ref('constructionProgressChart'),
  xData: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  yData: {
    estimated: [220, 182, 191, 234, 290, 330, 310, 280, 268, 210, 190, 200],
    actual: [120, 132, 101, 134, 90, 230, 210, 180, 157, 149, 129, 90],
  },
});

const chartSafeData = reactive({
  chartId: ref('constructionSaveChart'),
  xData: ['实名人数', '安全教育及技术交底人数', '保险人数'],
  yData: {
    estimated: [220, 182, 191, 234, 290, 330, 310, 280, 268, 210, 190, 200],
    actual: [120, 132, 101, 134, 90, 230, 210, 180, 157, 149, 129, 90],
  },
});
const safeChartStyle = reactive({
  height: '220px',
});

const laborTableData = reactive({
  title: ref('劳务款预览'),
  headers: reactive([
    { label: '劳务款总额', value: '200000.00' },
    { label: '工资总额', value: '180000.00' },
  ]),
  columns: reactive([
    { key: 'month', title: '月份' },
    { key: 'total', title: '劳务款总额' },
    { key: 'wageTotal', title: '工资总额' },
    { key: 'personNum', title: '工资人数' },
  ]),
  tableList: reactive([
    { month: '2022年12月', total: '35000', wageTotal: '35000', personNum: '35' },
    { month: '2022年11月', total: '25000', wageTotal: '25000', personNum: '25' },
    { month: '2022年10月', total: '20000', wageTotal: '20000', personNum: '20' },
    { month: '2022年09月', total: '15000', wageTotal: '15000', personNum: '15' },
  ]),
  total: ref(4),
  page: reactive({
    pageNow: ref(1),
    pageSize: ref(5),
  }),
});

const taskTableData = reactive({
  title: ref('任务数预览'),
  headers: reactive([
    { label: '任务总数(个)', value: 50 },
    { label: '需完成工程量', value: 5000 },
    { label: '实际完成工程量', value: 5000 },
  ]),
  columns: reactive([
    { key: 'month', title: '月份' },
    { key: 'taskNum', title: '任务数' },
    { key: 'notDown', title: '需完成' },
    { key: 'down', title: '已完成' },
  ]),
  tableList: reactive([
    { month: '2022年12月', taskNum: '35000', notDown: '35000', down: '35000' },
    { month: '2022年11月', taskNum: '25000', notDown: '25000', down: '25000' },
    { month: '2022年10月', taskNum: '20000', notDown: '20000', down: '20000' },
    { month: '2022年09月', taskNum: '15000', notDown: '15000', down: '15000' },
    { month: '2022年08月', taskNum: '5000', notDown: '5000', down: '5000' },
  ]),
  total: ref(5),
  page: reactive({
    pageNow: ref(1),
    pageSize: ref(5),
  }),
});
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
.not-start {
  background-color: #f2f2f2;
}
.delay {
  background-color: red;
}
.progress-tags {
  padding: 0 20px;
  label {
    margin-right: 20px;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    .tag-img {
      display: inline-block;
      width: 25px;
      height: 20px;
      border: 1px solid #797979;
      vertical-align: bottom;
      margin-right: 5px;
    }
  }
}
</style>
