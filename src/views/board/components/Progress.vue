<template>
  <div class="progress-container">
    <el-card class="system-card">
      <div class="system-item" v-for="(item, index) in systemList" :key="index">
        <div class="item-header">{{ item.name }}</div>
        <div class="item-body">
          <div>工程量：{{ item.quantities }}</div>
          <div>预计进度：{{ item.expectProgress }}</div>
          <div>实际进度：{{ item.realProgress }}</div>
        </div>
      </div>
    </el-card>
    <el-card class="area-card">
      <template #header>
        <div class="area-header">
          <el-row>
            <el-col :span="12">
              <div class="area-title">区域预览</div>
              <div class="progress-tags">
                <label>
                  <span class="tag-img not-start"></span>
                  <span class="tag-info">未开始</span>
                </label>
                <label>
                  <span class="tag-img normal"></span>
                  <span class="tag-info">正常进度</span>
                </label>
                <label>
                  <span class="tag-img delay"></span>
                  <span class="tag-info">延期未完成</span>
                </label>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="query-group">
                <el-row justify="end">
                  <el-col :span="10">
                    <label>进度：</label>
                    <el-select v-model="queryList.progress">
                      <el-option
                        v-for="item in progressOpts"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select> </el-col
                  ><el-col :span="10">
                    <label>区域：</label>
                    <el-cascader
                      v-model="queryList.area"
                      :options="areaOpts"
                      :props="cascaderProps"
                      collapse-tags
                      clearable
                    />
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </template>
      <div class="area-body">
        <div v-for="(item, index) in areaData" :key="index">
          <div class="area-name">{{ item.areaName }}</div>
          <div
            class="system-item"
            v-for="(child, i) in item.systemList"
            :key="i"
            :class="child.status === '1' ? 'not-start' : child.status === '2' ? 'normal' : 'delay'"
          >
            <div class="item-header">{{ child.systemName }}</div>
            <div class="item-body">
              <div>工程量：{{ child.quantities }}</div>
              <div>预计进度：{{ child.expectProgress }}</div>
              <div>实际进度：{{ child.realProgress }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <pagination
          :total="areaData.length"
          v-model:page="currentPage"
          v-model:limit="pageSizes"
          :auto-scroll="false"
          @pagination="getList"
        ></pagination>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, getCurrentInstance, computed, defineProps } from 'vue';
import Pagination from '@/components/Pagination.vue';

const props = defineProps({
  page: {
    type: Number,
    default: 1,
  },
  rows: {
    type: Number,
    default: 5,
  },
});

const { proxy } = getCurrentInstance()!;

const systemList = reactive([
  { name: '自动喷淋系统', quantities: '1000/10000', expectProgress: '10%', realProgress: '10%' },
  { name: '室外消火栓系统', quantities: '1000/10000', expectProgress: '10%', realProgress: '10%' },
  { name: '防排烟系统', quantities: '1000/10000', expectProgress: '10%', realProgress: '10%' },
]);

const queryList = reactive({
  progress: '',
  area: [],
});
const cascaderProps = reactive({
  multiple: true,
});
const progressOpts = reactive([
  { value: '', label: '全部' },
  { value: 1, label: '未开始' },
  { value: 2, label: '正常进度' },
  { value: 3, label: '延期未完成' },
]);
const areaOpts = reactive([
  {
    value: 1,
    label: '塔楼',
    children: [
      { value: 4, label: '一层' },
      { value: 5, label: '二层' },
      { value: 6, label: '三层' },
    ],
  },
  {
    value: 2,
    label: '裙楼',
    children: [
      { value: 4, label: '一层' },
      { value: 5, label: '二层' },
      { value: 6, label: '三层' },
    ],
  },
  {
    value: 3,
    label: '地下室',
    children: [
      { value: 4, label: '一层' },
      { value: 5, label: '二层' },
      { value: 6, label: '三层' },
    ],
  },
]);

const areaData = reactive([
  {
    areaName: '塔楼二层',
    systemList: [
      {
        systemName: '自动喷淋系统',
        quantities: '1500/3000 ',
        expectProgress: '50%',
        realProgress: '50%',
        status: '1',
      },
      {
        systemName: '室外消火栓系统',
        quantities: '1500/3000 ',
        expectProgress: '50%',
        realProgress: '50%',
        status: '2',
      },
      {
        systemName: '防排烟系统',
        quantities: '1500/3000 ',
        expectProgress: '50%',
        realProgress: '50%',
        status: '3',
      },
    ],
  },
  {
    areaName: '塔楼san层',
    systemList: [
      {
        systemName: '自动喷淋系统',
        quantities: '1500/3000 ',
        expectProgress: '50%',
        realProgress: '50%',
        status: '1',
      },
      {
        systemName: '室外消火栓系统',
        quantities: '1500/3000 ',
        expectProgress: '50%',
        realProgress: '50%',
        status: '2',
      },
      {
        systemName: '防排烟系统',
        quantities: '1500/3000 ',
        expectProgress: '50%',
        realProgress: '50%',
        status: '3',
      },
    ],
  },
  {
    areaName: '地下室一层',
    systemList: [
      {
        systemName: '自动喷淋系统',
        quantities: '1500/3000 ',
        expectProgress: '50%',
        realProgress: '50%',
        status: '1',
      },
      {
        systemName: '室外消火栓系统',
        quantities: '1500/3000 ',
        expectProgress: '50%',
        realProgress: '50%',
        status: '2',
      },
      {
        systemName: '防排烟系统',
        quantities: '1500/3000 ',
        expectProgress: '50%',
        realProgress: '50%',
        status: '3',
      },
    ],
  },
  {
    areaName: '地下室二层',
    systemList: [
      {
        systemName: '自动喷淋系统',
        quantities: '1500/3000 ',
        expectProgress: '50%',
        realProgress: '50%',
        status: '1',
      },
      {
        systemName: '室外消火栓系统',
        quantities: '1500/3000 ',
        expectProgress: '50%',
        realProgress: '50%',
        status: '2',
      },
      {
        systemName: '防排烟系统',
        quantities: '1500/3000 ',
        expectProgress: '50%',
        realProgress: '50%',
        status: '3',
      },
    ],
  },
]);

// 页码变化触发获取数据
const getList = (obj: any) => {
  proxy?.$emit('getList', obj);
};
const currentPage = computed({
  get: () => {
    return props.page;
  },
  set: (val) => {
    proxy?.$emit('update:page', val);
  },
});
const pageSizes = computed({
  get: () => {
    return props.rows;
  },
  set: (val) => {
    proxy?.$emit('update:rows', val);
  },
});
</script>

<style lang="scss" scoped>
.progress-container {
  font-size: 14px;
  // common-start
  .not-start {
    background-color: #f2f2f2;
  }
  .delay {
    background-color: red;
  }
  .system-item {
    border: 1px solid #797979;
    border-radius: 8px;
    width: 20%;
    padding: 7px 10px;

    div {
      padding: 3px 0;
    }

    .item-header {
      font-weight: 600;
    }
  }
  // common-end
  .system-card {
    width: 100%;
    &:deep(.el-card__body) {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      padding: 0;
    }
    .system-item {
      border: 1px solid #797979;
      border-radius: 4px;
      width: 20%;
      padding: 7px 10px;

      div {
        padding: 3px 0;
      }

      .item-header {
        font-weight: 600;
      }
    }
  }

  .area-card {
    margin-top: 20px;
    width: 100%;
    .area-header {
      .area-title {
        font-size: 12px;
        color: #666;
      }
      .progress-tags {
        padding-top: 10px;
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
      .query-group {
        .el-col {
          text-align: right;
        }
      }
    }
    .area-body {
      overflow-x: auto;
      border: 1px solid #797979;
      border-bottom: none;
      & > div {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        border-bottom: 1px solid #797979;
      }
      .area-name {
        flex-shrink: 0; // 空间不足不缩小
        width: 100px;
        text-align: center;
      }
      .system-item {
        border-radius: 0;
        width: 250px;
        border-top: none;
        border-bottom: none;
        &:not(:last-child) {
          border-right: none;
        }
      }
    }
    .pagination {
      text-align: center;
    }
  }
}
</style>
