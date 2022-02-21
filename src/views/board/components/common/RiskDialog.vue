<template>
  <div>
    <el-dialog :title="dialogTitle" :model-value="dialogVisible" @close="closeDialog" width="30%">
      <div>
        <div class="tab-title">{{ riskType }}</div>
        <el-tabs :tab-position="tabPosition" style="height: 200px" class="demo-tabs">
          <template v-for="(item, index) in tabList" :key="index">
            <el-tab-pane :label="item.name">{{ item.roster.join(',') }}</el-tab-pane>
          </template>
        </el-tabs>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog">我已了解</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, reactive, onMounted } from 'vue';
const props = defineProps({
  dialogTitle: {
    type: String,
    default: '',
  },
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  propData: {
    type: Object,
  },
});
const emit = defineEmits(['closeDialog']);
const closeDialog = () => {
  emit('closeDialog');
};

const riskType = ref('');
const tabPosition = ref('left');
const tabList = reactive([
  { name: '张三施工队', roster: ['张三', '李四', '王五', '赵六', '李七'] },
  { name: '张三施工队', roster: ['张三', '李四', '王五'] },
  { name: '张三施工队', roster: ['张三', '李四', '王五', '赵六', '李七'] },
]);

onMounted(() => {
  riskType.value = '未上传一人一册名单：';
});
</script>

<style lang="scss" scoped>
:deep(.el-dialog__header) {
  border-bottom: 1px solid #dcdfe6;
}
:deep(.el-dialog__body) {
  padding: 0;
}
.tab-title {
  border-bottom: 1px solid #dcdfe6;
  margin: 0 20px 10px;
  padding: 10px 0;
}

:deep(.el-dialog__footer) {
  border-top: 1px solid #dcdfe6;
  text-align: center;
}
</style>
