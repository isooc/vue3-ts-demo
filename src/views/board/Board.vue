<template>
  <div class="board-container">
    <div class="page-header">
      <div class="project">
        <span>腾讯数码大厦</span>
        <el-button type="primary">更换项目</el-button>
      </div>
      <div class="tabs">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="总体预览" name="total">
            <total></total>
          </el-tab-pane>
          <el-tab-pane label="进度预览" name="progress">
            <Progress></Progress>
          </el-tab-pane>
          <el-tab-pane label="施工队预览" name="construction">
            <construction></construction>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Total from './components/Total.vue';
import Progress from './components/Progress.vue';
import Construction from './components/Construction.vue';

const activeName = ref('total');
const handleClick = (tab: any) => {
  console.log(tab.props.name);
};
</script>

<style lang="scss" scoped>
.board-container {
  .project > span {
    margin-right: 20px;
  }
}
</style>
