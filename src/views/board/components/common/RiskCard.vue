<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>风险预警</span>
        </div>
      </template>
      <div class="card-body">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane name="safe">
            <template #label>
              <div class="tab-label">
                <div class="label">安全问题</div>
                <div class="value">3</div>
              </div>
            </template>
          </el-tab-pane>
          <el-tab-pane name="progress">
            <template #label>
              <div class="tab-label">
                <div class="label">进度问题</div>
                <div class="value">5</div>
              </div>
            </template>
          </el-tab-pane>
        </el-tabs>
        <ul>
          <li v-for="(item, index) in list" :key="index">
            <a @click="openDialog(item)">
              <span>{{ item.label }}：</span>
              <span>{{ item.value }}</span>
            </a>
          </li>
        </ul>
      </div>
    </el-card>
    <risk-dialog
      :dialogTitle="dialogData.dialogTitle"
      :dialogVisible="dialogData.dialogVisible"
      @closeDialog="closeDialog"
    ></risk-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import RiskDialog from './RiskDialog.vue';
import { ObjectType } from '@/utils/obj-type';

const activeName = ref('safe');
const handleClick = (tab: string) => {
  // console.log('tab', tab);
};

const list = reactive([
  { label: '问题一', value: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX' },
  { label: '问题二', value: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX' },
  { label: '问题三', value: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX' },
  { label: '问题四', value: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX' },
]);

const openDialog = (item: ObjectType) => {
  dialogData.dialogVisible = true;
  dialogData.propData = item;
};

const dialogData = reactive({
  dialogTitle: '安全预警',
  dialogVisible: false,
  propData: {},
});
const closeDialog = () => {
  dialogData.dialogVisible = false;
};
</script>

<style lang="scss" scoped>
.card-body {
  ul {
    height: 196px;
    overflow-y: auto;
    & > li {
      padding-bottom: 10px;
    }
  }
}
.tab-label {
  text-align: center;
  > div {
    height: 18px;
    line-height: 18px;
  }
  .label {
    color: #999;
    font-size: 12px;
  }
  .value {
    font-size: 16px;
    color: #303133;
  }
}
</style>
