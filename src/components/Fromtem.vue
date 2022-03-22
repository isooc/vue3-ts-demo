<!-- 封装form -->
<template>
  <div>
    <el-form ref="formRef" :model="formData" :rules="formRules">
      <template v-for="(item, index) in formList">
        <!-- 默认input -->
        <el-form-item :key="index" v-if="!item.type || item.type === 'input'" :label="item.label">
          <el-input v-model="item.value" :placeholder="item.placeholder || ''"></el-input>
        </el-form-item>
        <!-- select -->
        <el-form-item :key="index" v-if="item.type === 'select'" :label="item.label">
          <el-select
            :clearable="item.clearable"
            :filterable="item.filterable"
            v-model="item.value"
            :placeholder="item.placeholder || '请选择'"
            @change="item.emitKey ? selectedChange(item.emitKey, ...arguments) : ''"
          >
            <el-option
              v-for="(option, i) in item.options"
              :key="i"
              :label="item.optionsFields ? option[item.optionsFields[0]] : option.label"
              :value="item.optionsFields ? option[item.optionsFields[1]] : option.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';

export default defineComponent({
  name: 'FormTem',
  props: {
    formData: {
      type: Object,
      required: true,
    },
    formRules: {
      type: Object,
      required: false,
    },
    formList: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const formRef = ref();
    const formData = reactive({});
    return {
      formRef,
      ...toRefs(formData),
    };
  },
});
</script>

<style lang="scss" scoped></style>
