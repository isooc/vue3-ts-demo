<template>
  <div>
    <el-form ref="formRef" :model="userData" :rules="formRules" label-width="100" class="user-form">
      <el-form-item label="姓名" prop="name">
        <el-input :value="userData.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select :value="userData.sex">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input :value="userData.age"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">保存</el-button>
        <el-button @click="resetForm">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue';

export default defineComponent({
  name: 'userDialog',
  props: {
    userData: {
      type: Object,
    },
  },
  setup(props) {
    console.log('props', props);

    const { proxy } = getCurrentInstance()!;
    const formRef = ref();
    const data = reactive({
      formRules: {
        name: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入姓名！',
          },
        ],
        sex: [
          {
            required: true,
            trigger: 'change',
            message: '请选择性别',
          },
        ],
        age: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入年龄！',
          },
        ],
      },
    });
    const submitForm = () => {
      formRef.value.validate((valid: boolean) => {
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
    const resetForm = () => {
      formRef.value.resetFields();
    };
    onMounted(() => {
      // console.log();
    });
    return {
      formRef,
      ...toRefs(data),
      submitForm,
      resetForm,
    };
  },
});
</script>

<style lang="scss" scoped></style>
