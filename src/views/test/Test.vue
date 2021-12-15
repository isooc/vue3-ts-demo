<template>
  <div>
    <!-- 表格编辑、验证 -->
    <el-form
      class="test-form"
      ref="formRef"
      :model="formData"
      :rules="formRules"
      :inline-message="true"
    >
      <el-table
        ref="singleTable"
        :data="formData.tableData"
        stripe
        highlight-current-row
        style="width: 100%"
        :header-cell-style="{ 'background-color': '#D3E0F5' }"
      >
        <el-table-column align="center" type="index" label="序号" width="50" />
        <el-table-column align="center" property="date" label="日期" width="250">
          <template #default="scope">
            <el-form-item
              label-width="0"
              :prop="'tableData.' + scope.$index + '.date'"
              :rules="formRules.date"
            >
              <el-date-picker
                v-model="scope.row.date"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="Pick a day"
              >
              </el-date-picker>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column align="center" property="name" label="姓名" width="120">
          <template #default="scope">
            <el-form-item
              label-width="0"
              :prop="'tableData.' + scope.$index + '.name'"
              :rules="formRules.name"
            >
              <el-input v-model="scope.row.name"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column align="center" property="address" label="地址">
          <template #default="scope">
            <el-form-item
              label-width="0"
              :prop="'tableData.' + scope.$index + '.address'"
              :rules="formRules.address"
            >
              <el-input v-model="scope.row.address"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button type="text" @click="copyRow(scope.row)">复制一行</el-button>
            <el-button type="text" @click="delRow(scope.$index, formData.tableData)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-button class="btn-add-row" @click="copyRow()">新增一行</el-button>
    <div class="save-data">
      <el-button>取 消</el-button>
      <el-button type="primary" @click="onSubmit">提 交</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, defineComponent, reactive, ref, toRefs } from 'vue';

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance()!;
    const formRef = ref();
    const singleTable = ref();
    const data = reactive({
      formData: {
        tableData: [
          {
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-04',
            name: 'Joy',
            address: 'No. 189, Grove St, Los Angeles',
          },
        ],
      },
      formRules: {
        date: [{ required: true, message: 'Please select date', trigger: 'change' }],
        name: [{ required: true, message: 'Please input name', trigger: 'blur' }],
        address: [{ required: true, message: 'Please input address', trigger: 'blur' }],
      },
    });
    const copyRow = (row: any) => {
      data.formData.tableData.push(Object.assign({}, row));
    };
    const delRow = (index: number, rows: any) => {
      rows.splice(index, 1);
    };
    const onSubmit = () => {
      formRef.value.validate((valid: boolean) => {
        if (valid) {
          proxy?.$message({
            message: '保存成功！',
            type: 'success',
          });
          console.log('submit', data.formData.tableData);
        } else {
          console.log('error submit!!');
        }
      });
    };
    return {
      formRef,
      singleTable,
      ...toRefs(data),
      copyRow,
      delRow,
      onSubmit,
    };
  },
});
</script>

<style lang="scss" scoped>
.test-form {
  .el-form-item {
    margin-bottom: 0;
  }
}
.btn-add-row {
  width: 100%;
}
.save-data {
  text-align: center;
  margin-top: 100px;
}
</style>
