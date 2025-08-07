<template>
    <div>
        <el-form :inline="true" :model="formData">
            <el-form-item label="场馆名称">
                <el-select v-model="value" placeholder="请选择状态" style="width: 240px">
                    <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="用户ID">
                <el-input v-model="formData.userId" placeholder="请输入用户ID" clearable />
            </el-form-item>
            <el-form-item label="平台用户昵称">
                <el-input v-model="formData.userId" placeholder="请输入平台用户昵称" clearable />
            </el-form-item>
            <el-form-item label="局号">
                <el-input v-model="formData.userId" placeholder="请输入局号" clearable />
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="value" placeholder="请选择状态" style="width: 240px">
                    <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="日期时间">
                <el-date-picker v-model="state.time" type="daterange" :shortcuts="shortcuts" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getList">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="state.tableData" border style="width: 100%">
            <el-table-column prop="adminId" label="用户ID" align="center" width="180" />
            <el-table-column prop="realName" label="平台用户昵称" align="center" width="180" />
            <el-table-column prop="memberCount" label="上级" align="center" width="180" />
            <el-table-column prop="finalWinLoss" label="游戏类型" align="center" width="180" />
            <el-table-column prop="totalRebateAmount" label="局号" align="center" width="180" />
            <el-table-column prop="agentProfitPercent" label="桌台ID" align="center" width="180" />
            <el-table-column prop="agentUrl" label="桌台名称" align="center" width="220" />
            <el-table-column prop="statAddAt" label="状态" align="center" width="220">
                <template #default="{ row }">
                    <div>{{ dayjs(row.statAddAt).format('YYYY-MM-DD HH:mm:ss') }}</div>
                </template>
            </el-table-column>
            <el-table-column label="本局压分" align="center" width="220" />
            <el-table-column label="本局得分" align="center" width="220" />
            <el-table-column label="结算金额" align="center" width="220" />
            <el-table-column label="有效流水" align="center" width="220" />
            <el-table-column label="结算时间" align="center" width="220" />
            <el-table-column label="交易代码" align="center" width="220" />
            <el-table-column label="游戏回合编号" align="center" width="220" />
            <el-table-column label="客户端IP" align="center" width="220" />
        </el-table>
        <div class="dfcfe mt20">
            <el-pagination v-model:current-page="formData.page" v-model:page-size="formData.size"
                :page-sizes="[5, 10, 20, 25]" layout="total, sizes, prev, pager, next, jumper" :total="state.total" />
        </div>
    </div>
</template>

<script setup>
import { reactive, watch } from "vue";
const shortcuts = [
    {
        text: '最近一周',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setDate(start.getDate() - 7)
            return [start, end]
        },
    },
    {
        text: '最近一个月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 1)
            return [start, end]
        },
    },
    {
        text: '最近三个月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 3)
            return [start, end]
        },
    },
]

const typeList = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
]




const state = reactive({
    tableData: [],
    total: 0,
    time: [],
    activeName: ""
});

const formData = reactive({
    userId: '',
    account: '',
    nick: '',
    startDate: "",
    endDate: "",
    page: 1,
    size: 10
})
// 获取代理列表
const getList = async () => {
    // const res = await getProxyList(formData);
    // state.tableData = res.records || [];
    // state.total = res.total || 0;
}
watch([() => formData.page, () => formData.size], () => {
    getList();
});

// 处理时间选择
watch(() => state.time, (val) => {
    if (val) {
        formData.startDate = dayjs(val[0]).format('YYYY-MM-DD HH:mm:ss');
        formData.endDate = dayjs(val[1]).format('YYYY-MM-DD HH:mm:ss');
    } else {
        formData.startDate = '';
        formData.endDate = '';
    }
}, { deep: true });

getList();
</script>

<style lang="scss" scoped></style>