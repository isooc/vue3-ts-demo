<!--
 * @Author: isaac
 * @Date: 2022-02-17 11:48:25
 * @LastEditors: isaac
 * @LastEditTime: 2022-02-17 11:48:25
 * @Description: 封装el-table
 -->

<template>
  <div class="base-table-container">
    <el-row>
      <el-col :span="24">
        <el-form
          class="form-table"
          ref="formRef"
          :model="formModel"
          :rules="formRules"
          :disabled="formDisabled"
          :inline-message="true"
        >
          <el-table
            :data="formModel.list || list"
            :default-expand-all="defaultExpandAll"
            :row-key="rowKey"
            :span-method="mergeCells ? objectSpanMethod : null"
            :header-cell-style="headerStyle"
            :header-row-style="{ height: '32px' }"
            :row-style="{ height: '32px' }"
            :cell-style="{ 'font-size': '12px', padding: '0px' }"
            @selection-change="handleSelectionChange"
            @cell-click="cellClcik"
            @row-click="rowClick"
            v-bind="$attrs"
            :height="tableHeight"
            :max-height="maxTableHeight"
            ref="table"
          >
            <!--   -->
            <template v-for="(column, index) in columns">
              <!-- 复选框 -->
              <el-table-column
                :key="index"
                v-if="column.type === 'selection'"
                type="selection"
                width="55"
                align="left"
              ></el-table-column>
              <!-- 输入框 -->
              <!-- 在使用表格输入框时要将表格数据赋值给 formModel.list 并且设置表头type为 input -->
              <el-table-column
                :key="index + 1"
                v-else-if="column.type === 'input'"
                type="input"
                :label="column.title"
                :width="column.type === 'date' ? '170' : column.width"
                :align="column.align || 'left'"
              >
                <template v-slot="scope">
                  <el-form-item
                    label-width="0"
                    :prop="'list.' + scope.$index + '.' + column.key"
                    :rules="formRules[column.key]"
                  >
                    <el-input v-if="!column.hidden" v-model="scope.row[column.key]"></el-input>
                    <slot v-if="column.slot" :name="column.slot" :scope="scope"></slot>
                  </el-form-item>
                </template>
              </el-table-column>
              <!-- 序号 -->
              <el-table-column
                :key="index + 2"
                v-else-if="column.type === 'index'"
                type="index"
                :index="continuousIndex"
                width="60"
                label="序号"
                align="left"
              ></el-table-column>
              <!-- 具体内容 -->
              <el-table-column
                :key="index + 3"
                v-else-if="
                  (column.showColumn && column.showColumn === true) ||
                  column.showColumn === undefined
                "
                :label="column.title"
                :width="column.type === 'date' ? '170' : column.width"
                :fixed="column.fixed"
                :align="column.align || 'left'"
                :header-align="column.headerAlign || 'left'"
                :show-overflow-tooltip="column.showOverflowTooltip || false"
              >
                <template v-slot="scope">
                  <!-- 仅仅显示文字 -->
                  <span v-if="!column.hidden">
                    <!-- 如果hidden为true的时候 那么当前格可以不显示，可以选择显示自定义的slot-->
                    <!-- 操作按钮 -->
                    <label v-if="column.type === 'operate'">
                      <template v-for="(operate, index) in column.operates">
                        <el-button
                          :key="index"
                          v-if="
                            operate.escape &&
                            operate.escape(scope.row, scope.$index).isShow !== undefined
                              ? operate.escape(scope.row, scope.$index).isShow
                              : true
                          "
                          :disabled="
                            (operate.escape && operate.escape(scope.row, scope.$index).disabled) ||
                            false
                          "
                          @click="handleClick(operate, scope.row, scope.$index)"
                          type="text"
                          size="small"
                          >{{
                            (operate.escape && operate.escape(scope.row, scope.$index).text) ||
                            operate.name
                          }}</el-button
                        >
                      </template>
                    </label>
                    <!-- <el-input
                    v-else-if="column.type === 'edit'"
                    v-model="scope.row[column.key]"
                  ></el-input> -->
                    <!-- 文字内容 可转码 -->
                    <span v-else>{{
                      (column.escape && column.escape(scope.row)) || scope.row[column.key]
                    }}</span>
                  </span>
                  <!-- 使用slot的情况下 -->
                  <label v-if="column.slot">
                    <!-- 具名slot -->
                    <slot v-if="column.slot" :name="column.slot" :scope="scope"></slot>
                  </label>
                </template>
              </el-table-column>
            </template>

            <!--默认的slot -->
            <slot></slot>
            <template class="no-data">
              <div v-if="defaultEmpty" class="no-data-info">暂无数据</div>
              <div v-else>
                <div class="no-data-text">
                  <div class="no-data-title">抱歉！暂时没有数据</div>
                  <div class="no-data-info">暂时还没有相关的数据可以显示</div>
                </div>
              </div>
            </template>
          </el-table>
        </el-form>
        <pagination
          v-if="paginationShow"
          v-show="total > 0"
          :total="total"
          v-model:page="currentPage"
          v-model:limit="pageSizes"
          :auto-scroll="false"
          position="right"
          @pagination="getList"
        ></pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
/**
 * @author wuhao
 * @todo 项目中使用表格分页
 * @property
 * list => 表格数据
 * columns: [ ==> 配置表格头
 *  key: => 渲染字段名称
 *  title: => 表头名称
 *  operates： => 操作数组 [
 *      name: 名称
 *      emitKey: 要emit出去的事件
 *  ]
 * ]
 * demo columns
 * headers: [
        { type: 'selection'},
        { type: 'index'},
        { key: 'loginName', title: 'XXX'，escape: row => { return row.state == 0? "发送": "已领取"} },   <!-- escape字段可写转码函数 -->
        { key: 'userName', title: 'XXX' },
        { key: 'roleName', title: 'XXX', hidden: true, slot: 'roleSlot' },
        { key: 'createDate', title: 'XXX' },
        // operate 这一行可以选择直接使用slot或者是使用配置项
        { type: 'operate', title: 'XXX',
          operates: [
            { name: 'XXX', emitKey: 'reset' },
            { name: 'XXX', emitKey: 'edit' },
            { name: 'XXX', emitKey: 'delete' }
        ] }
      ]
 */

import { defineProps, getCurrentInstance, onMounted, ref, computed } from 'vue';
import Pagination from '@/components/Pagination.vue';
import { pageY } from '@/utils/tools';
const props = defineProps({
  // 核心数据
  list: {
    type: Array,
    default: () => [] as [],
  },
  // columns
  columns: {
    type: Array as any,
    required: true,
    default: () => [],
  },
  paginationShow: {
    type: Boolean,
    default: true,
  },
  // empty=true，表格无数据显示"暂无数据"
  defaultEmpty: {
    type: Boolean,
    default: false,
  },
  // 表头背景色
  headerStyle: {
    default: () => {
      return { background: '#E8F0FA', color: '#333', padding: '0px', 'font-weight': 500 };
    },
  },
  /* 
      行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。类型为 String 时，
      支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function 
    */
  rowKey: {
    type: String,
    default: '',
  },
  // 是否默认展开所有行，当 Tale 包含展开行存在或者为树形表格时有效
  defaultExpandAll: {
    type: Boolean,
    default: false,
  },
  // 是否合并单元格
  mergeCells: {
    type: Boolean,
    default: false,
  },
  // 需合并的判断字段
  mergeField: {
    type: String,
    default: 'id',
  },
  // 需合并的列index
  mergeColumns: {
    type: Array,
    default: () => [],
  },
  total: {
    type: Number,
    default: 0,
  },
  page: {
    type: Number,
    default: 1,
  },
  rows: {
    type: Number,
    default: 1,
  },
  tableHeightProps: {
    type: Boolean,
    default: false,
  },
  // 多选框回显
  echo: {
    type: Function,
  },
  // 表单验证
  formModel: {
    type: Object,
    default: () => ({}),
  },
  formRules: {
    type: Object,
    default: () => ({}),
  },
  formDisabled: {
    type: Boolean,
    default: false,
  },
  ownCellStyle: {
    type: Boolean,
    default: false,
  },
  errorRows: {
    type: Array,
    default: () => [],
  },
});

const { proxy } = getCurrentInstance()!;
const table = ref();
const testHeight = ref(500);

onMounted(() => {
  proxy?.$nextTick(() => {
    setTimeout(() => {
      let eleTable = table.value.$el;
      if (props.paginationShow) {
        testHeight.value =
          window.innerHeight - pageY(eleTable) - 50 - 12 < 300
            ? 300
            : window.innerHeight - pageY(eleTable) - 50 - 12;
      } else {
        testHeight.value =
          window.innerHeight - pageY(eleTable) - 50 + 32 < 300
            ? 300
            : window.innerHeight - pageY(eleTable) - 50 + 32;
      }
      if (props.echo) {
        props.echo(table.value);
      }
    }, 200);
  });
});

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
const tableHeight = computed(() => {
  if (props.tableHeightProps) {
    return null;
  } else {
    return testHeight.value;
  }
});
const maxTableHeight = computed(() => {
  if (props.tableHeightProps) {
    return 600;
  } else {
    return null;
  }
});

// 让index序号连续
const continuousIndex = (index: number): number => {
  return index + (Number(currentPage) - 1) * Number(pageSizes) + 1;
};
// 页码变化触发获取数据
const getList = (obj: any) => {
  proxy?.$emit('getList', obj);
};
// 处理点击事件
const handleClick = (action: any, data: any, index: number) => {
  // emit事件
  proxy?.$emit(`${action.emitKey}`, data, index);
};
// 点击行
const rowClick = (val: any) => {
  proxy?.$emit('rowClick', val);
};
// 选中变化
const handleSelectionChange = (val: any) => {
  proxy?.$emit('changeSelect', val);
};
// 单元格click
const cellClcik = (row: any, column: any, cell: any, event: any) => {
  proxy?.$emit('cellClcik', row, column, cell, event);
};
// 合并行
const objectSpanMethod = ({ row, column, rowIndex, columnIndex }) => {
  // 合并单元格
  let tableData = props.list as any[];
  let num = 0;
  if (props.mergeColumns.includes(columnIndex)) {
    for (let i = 0; i < tableData.length; i++) {
      if (row[props.mergeField] === tableData[i][props.mergeField]) {
        num++;
      }
    }
    if (num === 1) {
      return [num, 1];
    } else if (num > 1 && tableData && tableData[rowIndex][props.mergeField]) {
      if (
        tableData[rowIndex - 1] &&
        tableData[rowIndex][props.mergeField] === tableData[rowIndex - 1][props.mergeField]
      ) {
        return [0, 0];
      } else {
        return [num, 1];
      }
    }
  }
};
</script>

<style scoped lang="scss">
.base-table-container {
  margin-top: 20px;
  .el-table::before {
    height: 0;
  }
  &:deep(.el-table__fixed-right::before, .el-table__fixed::before) {
    height: 0;
  }
  .no-data {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1.5;
    color: #333;
    img {
      width: 120px;
    }
    .no-data-text {
      text-align: center;
      // margin-left: 24px;
      .no-data-title {
        padding: 6px 0;
        font-size: 24px;
        font-weight: 500;
      }
    }
    .no-data-info {
      padding: 6px 0;
      font-size: 14px;
      color: #999;
    }
  }
  .el-button--text {
    padding: 0 !important;
    color: #4876f9;
    font-weight: 400;
  }
  // 输入框表格样式
  &:deep(.el-table td.el-table__cell .cell) {
    padding: 3px 8px;
  }
  &:deep(.el-table__fixed-right) {
    display: none !important;
  }
  &:deep(.is-hidden .cell) {
    visibility: visible;
  }
  &:deep(.el-form-item) {
    margin-bottom: 0px !important;
  }
}
</style>
