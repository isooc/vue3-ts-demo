<template>
  <div>
    <el-dialog :title="dialogTitle" :model-value="dialogVisible" @close="closeDialog" width="30%">
      <el-form
        ref="testRef"
        :model="testData"
        :rules="testRules"
        label-width="80px"
        class="test-form"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="testData.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="testData.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="testData.sex">
            <el-option label="女" :value="0">女</el-option>
            <el-option label="男" :value="1">男</el-option>
            <el-option label="未知" :value="2">未知</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="能力体系" prop="power">
          <el-input v-model="testData.power"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, ref, defineProps, toRef, defineEmits } from 'vue';

const props = defineProps({
  dialogTitle: String,
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  dialogData: Object,
});
const emit = defineEmits(['closeDialog']);
const { proxy } = getCurrentInstance()!;

const testData = toRef(props, 'dialogData');
const testRef = ref();
const testRules = reactive({
  name: [
    {
      required: true,
      trigger: 'blur',
      message: '请输入姓名！',
    },
  ],
  age: [
    {
      required: true,
      trigger: 'blur',
      message: '请输入年龄！',
    },
    {
      pattern: /^\+?[1-9]\d*$/,
      trigger: 'blur',
      message: '年龄必须为数字值！',
    },
  ],
  sex: [
    {
      required: true,
      trigger: 'blur',
      message: '请选择性别！',
    },
  ],
  power: [
    {
      required: true,
      trigger: 'blur',
      message: '请输入能力体系！',
    },
    {
      max: 10,
      trigger: 'blur',
      message: '最长10个字符！',
    },
  ],
});
const submitForm = () => {
  testRef.value.validate((valid: boolean) => {
    if (valid) {
      proxy?.$message({
        message: '保存成功！',
        type: 'success',
      });
    } else {
      console.log('error submit!!');
    }
  });
};
const closeDialog = () => {
  emit('closeDialog');
};
const resetForm = () => {
  testRef.value.resetFields();
  emit('closeDialog');
};
</script>

<style lang="scss" scoped></style>
