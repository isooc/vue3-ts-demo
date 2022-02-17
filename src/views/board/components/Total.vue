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
      <el-col :span="12"><progress-card></progress-card></el-col>
      <el-col :span="12"><risk-card></risk-card></el-col>
    </el-row>
    <el-row :gutter="20" class="personnel-safe">
      <el-col :span="12">
        <personnel-card></personnel-card>
      </el-col>
      <el-col :span="12">
        <safe-card></safe-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="table-card">
      <el-col :span="8">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>进度预览</span>
            </div>
          </template>
          <div class="card-body">
            <div class="table-header row-spacer">
              <div>
                <div class="label">总工程量</div>
                <div class="value">15000.00</div>
              </div>
              <div>
                <div class="label">材料预计总额(元)</div>
                <div class="value">15000.00</div>
              </div>
              <div>
                <div class="label">材料实际总额(元)</div>
                <div class="value">18000.00</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">劳务款</el-col>
      <el-col :span="8">任务数</el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
import ProgressCard from './common/ProgressCard.vue';
import RiskCard from './common/RiskCard.vue';
import PersonnelCard from './common/PersonnelCard.vue';
import SafeCard from './common/SafeCard.vue';
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

  .table-card {
    &:deep(.el-card__body) {
      // vue3 deep写法
      padding: 20px 0 !important;
    }
  }
}
</style>
