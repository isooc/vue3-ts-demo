<template>
  <div class="total-container">
    <el-row class="project-preview">
      <el-col :span="24">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>项目预览</span>
            </div>
          </template>
          <div class="card-body row-spacer">
            <div class="item">
              <div class="label">项目造价</div>
              <div class="value">300000.00</div>
            </div>
            <div class="item">
              <div class="label">合同费用(元)</div>
              <div class="value">300000.00</div>
            </div>
            <div class="item">
              <div class="label">项目起止日期</div>
              <div class="value">2020年12月1日-2022年12月30日</div>
            </div>
            <div class="item">
              <div class="label">项目地址</div>
              <div class="value">深圳市南山区南头街道200号马家龙文化体育中心2栋8楼B区-808</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="progress-risk">
      <el-col :span="12">
        <progress-card :chartData="chartProgressData"></progress-card>
      </el-col>
      <el-col :span="12"><risk-card></risk-card></el-col>
    </el-row>
    <el-row :gutter="20" class="personnel-safe">
      <el-col :span="12">
        <personnel-card></personnel-card>
      </el-col>
      <el-col :span="12">
        <safe-card :chartData="chartSafeData" :chartStyle="safeChartStyle"></safe-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="table-card">
      <el-col :span="8">
        <table-card :tableCardData="quantitiesTableData"></table-card>
      </el-col>
      <el-col :span="8">
        <table-card :tableCardData="laborTableData"></table-card>
      </el-col>
      <el-col :span="8">
        <table-card :tableCardData="taskTableData"></table-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import ProgressCard from './common/ProgressCard.vue';
import MyEcharts from '@/components/MyEcharts.vue';
import RiskCard from './common/RiskCard.vue';
import PersonnelCard from './common/PersonnelCard.vue';
import SafeCard from './common/SafeCard.vue';
import TableCard from './common/TableCard.vue';
import { ref, reactive } from 'vue';

const chartProgressData = reactive({
  chartId: ref('totalProgressChart'),
  xData: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  yData: {
    estimated: [220, 182, 191, 234, 290, 330, 310, 280, 268, 210, 190, 200],
    actual: [120, 132, 101, 134, 90, 230, 210, 180, 157, 149, 129, 90],
  },
});

const chartSafeData = reactive({
  chartId: ref('totalSafeChart'),
  xData: ['实名人数', '安全教育及技术交底人数', '保险人数'],
  yData: [35, 30, 20],
});

const safeChartStyle = reactive({
  height: '150px',
});

const quantitiesTableData = reactive({
  title: ref('工程量清单预览'),
  headers: reactive([
    { label: '总工程量', value: '15000.00' },
    { label: '材料预计总额(元)', value: '150000.00' },
    { label: '材料实际总额(元)', value: '180000.00' },
  ]),
  columns: reactive([
    { key: 'name', title: '材料名称' },
    { key: 'quantities', title: '工程量' },
    { key: 'realPrice', title: '实际单价' },
    { key: 'totalPrice', title: '实际合计' },
    { key: 'proportion', title: '占比' },
  ]),
  tableList: reactive([
    {
      name: '材料A',
      quantities: '35000',
      realPrice: '1',
      totalPrice: '35000',
      proportion: '35%',
    },
    {
      name: '材料B',
      quantities: '25000',
      realPrice: '1',
      totalPrice: '35000',
      proportion: '25%',
    },
    {
      name: '材料C',
      quantities: '20000',
      realPrice: '1',
      totalPrice: '35000',
      proportion: '20%',
    },
    {
      name: '材料D',
      quantities: '15000',
      realPrice: '1',
      totalPrice: '35000',
      proportion: '15%',
    },
  ]),
  total: ref(4),
  page: reactive({
    pageNow: ref(1),
    pageSize: ref(5),
  }),
});

const laborTableData = reactive({
  title: ref('劳务款预览'),
  headers: reactive([
    { label: '劳务款总额', value: '200000.00' },
    { label: '工资总额', value: '180000.00' },
  ]),
  columns: reactive([
    { label: '劳务款总额', value: '200000.00' },
    { label: '工资总额', value: '180000.00' },
  ]),
  tableList: reactive([
    { team: '张三', total: '35000', wageTotal: '35000', proportion: '35%' },
    { team: '李四', total: '25000', wageTotal: '25000', proportion: '25%' },
    { team: '王五', total: '20000', wageTotal: '20000', proportion: '20%' },
    { team: '赵六', total: '15000', wageTotal: '15000', proportion: '15%' },
  ]),
  total: ref(4),
  page: reactive({
    pageNow: ref(1),
    pageSize: ref(5),
  }),
});

const taskTableData = reactive({
  title: ref('任务数'),
  headers: reactive([
    { label: '任务总数(个)', value: '50' },
    { label: '需完成工程量', value: '5000' },
    { label: '实际完成工程量', value: '5000' },
  ]),
  columns: reactive([
    { key: 'team', title: '施工队' },
    { key: 'taskNum', title: '任务数' },
    { key: 'notDown', title: '需完成' },
    { key: 'down', title: '已完成' },
    { key: 'proportion', title: '占比' },
  ]),
  tableList: reactive([
    { team: '张三', taskNum: '35000', notDown: '35000', down: '35000', proportion: '35%' },
    { team: '李四', taskNum: '25000', notDown: '25000', down: '25000', proportion: '25%' },
    { team: '王五', taskNum: '20000', notDown: '20000', down: '20000', proportion: '20%' },
    { team: '赵六', taskNum: '15000', notDown: '15000', down: '15000', proportion: '15%' },
    { team: '姚七', taskNum: '5000', notDown: '5000', down: '5000', proportion: '5%' },
  ]),
  total: ref(5),
  page: reactive({
    pageNow: ref(1),
    pageSize: ref(5),
  }),
});
</script>

<style lang="scss" scoped>
.total-container {
  .el-row {
    margin-bottom: 20px;
  }
  .project-preview {
    &:deep(.el-card__body) {
      // vue3 deep写法
      padding: 20px 0 !important;
    }
    .card-body {
      .item {
        &:nth-child(3),
        &:nth-child(4) {
          flex: 2;
        }
      }
    }
  }
}
</style>
