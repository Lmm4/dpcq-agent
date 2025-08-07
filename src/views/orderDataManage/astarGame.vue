<template>
    <div>
        <el-form :inline="true" :model="formData">
            <el-form-item label="用户ID">
                <el-input v-model="formData.userId" placeholder="请输入用户ID" clearable />
            </el-form-item>
            <el-form-item label="用户账号">
                <el-input v-model="formData.username" placeholder="请输入用户账号" clearable />
            </el-form-item>
            <!-- <el-form-item label="局号">
                <el-input v-model="formData.roundNumber" placeholder="请输入局号" clearable />
            </el-form-item> -->
            <el-form-item label="牌局类型">
                <el-select v-model="formData.tableType" clearable placeholder="请选择牌局类型" style="width: 240px">
                    <el-option v-for="item in getDict('typeList')" :key="item.value" :label="item.label"
                        :value="item.value" />
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
            <el-table-column prop="userInfo.userId" label="用户ID" align="center" width="140" />
            <el-table-column prop="userInfo.username" label="用户账号" align="center" width="140" />
            <!-- <el-table-column align="center" width="180">
                <template #header>
                    <div>上级</div>
                    <div>(大股东/股东/代理)</div>
                </template>
<template #default="{ row }">
                    <div>{{ row.userInfo.fullName.join('/') }}</div>
                </template>
</el-table-column> -->
            <el-table-column label="游戏类型" align="center" width="140">
                <template #default="{ row }">
                    <div>{{ getDictLabel('typeList', row.rollin?.tabletype) }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="rollin.roundnumber" label="局号" align="center" width="180" />
            <el-table-column prop="rollin.tableid" label="桌台ID" align="center" width="140" />
            <!-- <el-table-column prop="rollin.tablename" label="桌台名称" align="center" width="220" /> -->
            <el-table-column prop="statAddAt" label="状态" align="center" width="120">
                <template #default="{ row }">
                    <div>{{ getDictLabel('tableStatus', row.rollin?.status) }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="rollin.bet" label="本局压分" align="center" width="120" />
            <el-table-column prop="rollin.win" label="本局得分" align="center" width="120" />
            <el-table-column prop="rollin.amount" label="结算金额" align="center" width="120" />
            <el-table-column prop="rollin.validbet" label="有效流水" align="center" width="120" />
            <el-table-column prop="rollin.datetime" label="结算时间" align="center" width="180">
                <template #default="{ row }">
                    <div>{{ dayjs(row.rollin?.datetime).format('YYYY-MM-DD HH:mm:ss') }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="rollin.mtcode" label="交易代码" align="center" width="180" />
            <el-table-column prop="rollin.round" label="游戏回合编号" align="center" width="140" />
            <el-table-column prop="rollout.ip" label="客户端IP" align="center" width="220" />
        </el-table>
        <div class="dfcfe mt20">
            <el-pagination v-model:current-page="formData.page" v-model:page-size="formData.size"
                :page-sizes="[5, 10, 20, 25]" layout="total, sizes, prev, pager, next, jumper" :total="state.total" />
        </div>
    </div>
</template>

<script setup>
import { reactive, watch, onMounted } from "vue";
import { getOrderDataList } from "@/api/page/orderDataManage.js";
import { getDict, getDictLabel } from "@/utils/dict.js";
import { localGet } from "@/utils/local.js";
import { dayjs } from "element-plus";
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

const state = reactive({
    tableData: [],
    total: 0,
    time: [],
});

const formData = reactive({
    userId: '',
    username: '',
    roundNumber: '',
    startTime: "",
    endTime: "",
    page: 1,
    size: 10,
    tableType: '',
    parentCode: ""
})
// 获取代理列表
const getList = async () => {
    const res = await getOrderDataList(formData);
    state.tableData = res.records || [];
    state.total = res.total || 0;
}
watch([() => formData.page, () => formData.size], () => {
    getList();
});
// 处理时间选择
watch(() => state.time, (val) => {
    if (val) {
        formData.startTime = dayjs(val[0]).format('YYYY-MM-DD HH:mm:ss');
        formData.endTime = dayjs(val[1]).format('YYYY-MM-DD HH:mm:ss');
    } else {
        formData.startTime = '';
        formData.endTime = '';
    }
}, { deep: true });

onMounted(() => {
    formData.parentCode = localGet('userInfo').code;
    getList();
})
</script>

<style lang="scss" scoped></style>