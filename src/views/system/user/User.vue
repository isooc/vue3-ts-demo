<template>
  <div>
    <div class="query-input">
      <el-form ref="formRef" :model="queryList" label-width="100" class="user-form">
        <el-form-item label="姓名">
          <el-input v-model="queryList.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="queryList.sex">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="edit()">查 询</el-button>
          <el-button @click="edit()">重 置</el-button>
          <el-button type="primary" @click="edit()" class="float-right">新 增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="date" label="创建时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template v-slot="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增/编辑 -->
    <el-dialog :title="dialogTitle" v-model="dialogVisible">
      <userDialog :userData="userData" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import userDialog from './components/DialogUser.vue';
export default defineComponent({
  name: 'User',
  components: { userDialog },
  setup() {
    const formRef = ref();
    const data = reactive({
      queryList: {
        name: '',
        sex: '',
      },
      options: [
        {
          value: '0',
          label: '男',
        },
        {
          value: '1',
          label: '女',
        },
      ],
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
      tableData: [] as any[],
      dialogTitle: '',
      dialogVisible: false,
    });
    const edit = (row?: Record<string, unknown>) => {
      console.log('row', row);
      data.dialogVisible = true;
    };
    const userData = reactive({
      name: '',
      sex: '',
      age: '',
    });

    onMounted(() => {
      console.log('ready');
      init();
    });
    const init = () => {
      data.tableData = [
        {
          name: '克莱恩',
          sex: '男',
          age: 23,
          date: '2020-11-19',
        },
        {
          name: '邓恩',
          sex: '男',
          age: 32,
          date: '2020-11-19',
        },
        {
          name: '阿蒙',
          sex: '男',
          age: 1000,
          date: '2020-11-19',
        },
      ];
    };
    return {
      formRef,
      ...toRefs(data),
      userData,
      edit,
      init,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-form {
  display: grid;
  grid-template-columns: 20% 20% 60%;
  .el-form-item {
    margin-right: 20px;
    .el-select {
      width: 100%;
    }
  }
}
</style>
