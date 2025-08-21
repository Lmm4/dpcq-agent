<template>
    <div>
        <el-form :inline="true" :model="formData">
            <el-form-item label="用户ID">
                <el-input v-model="formData.userId" placeholder="请输入用户ID" clearable />
            </el-form-item>
            <el-form-item label="用户账号">
                <el-input v-model="formData.username" placeholder="请输入用户账号" clearable />
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
            <el-table-column prop="record.transId" label="订单号" align="center" width="220" />
            <el-table-column prop="record.stake" label="投注金额" align="center" width="150" />
            <el-table-column prop="record.actualAmount" label="实际扣除额" align="center" width="150" />
            <el-table-column prop="record.winlostAmount" label="输赢金额" align="center" width="150" />
            <el-table-column prop="record.odds" label="注单赔率" align="center" width="120" />
            <el-table-column label="主队名称" align="center" width="140">
                <template #default="{ row }">
                    <div>{{row.record.hometeamname.filter(v => v.lang == 'cs')[0]?.name}}</div>
                </template>
            </el-table-column>
            <el-table-column label="客队名称" align="center" width="140">
                <template #default="{ row }">
                    <div>{{row.record.awayteamname.filter(v => v.lang == 'cs')[0]?.name}}</div>
                </template>
            </el-table-column>
            <el-table-column label="下注类型" align="center" width="120">
                <template #default="{ row }">
                    <div>{{row.record.bettypename.filter(v => v.lang == 'cs')[0]?.name}}</div>
                </template>
            </el-table-column>
            <el-table-column label="体育种类" align="center" width="120">
                <template #default="{ row }">
                    <div>{{row.record.sportname.filter(v => v.lang == 'cs')[0]?.name}}</div>
                </template>
            </el-table-column>
            <el-table-column label="赛事开球时间" align="center" width="220">
                <template #default="{ row }">
                    <div>{{ dayjs(row.record.matchDatetime).format('YYYY-MM-DD HH:mm:ss') }}</div>
                </template>
            </el-table-column>
            <el-table-column label="结算时间" align="center" width="220">
                <template #default="{ row }">
                    <div>{{ dayjs(row.record?.settlementTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
                </template>
            </el-table-column>
        </el-table>
        <div class="dfcfe mt20">
            <el-pagination v-model:current-page="formData.page" v-model:page-size="formData.size"
                :page-sizes="[5, 10, 20, 25]" layout="total, sizes, prev, pager, next, jumper" :total="state.total" />
        </div>
    </div>
</template>

<script setup>
import { reactive, watch, onMounted } from "vue";
import { getDict, getDictLabel } from "@/utils/dict.js";
import { dayjs } from "element-plus";
import { localGet } from "@/utils/local.js";
import { getShabaOrderDataList } from "@/api/page/orderDataManage.js";
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
    page: 1,
    size: 10,
    parentCode: "",
    startTime: "",
    endTime: "",
})
// 获取代理列表
const getList = async () => {
    const res = await getShabaOrderDataList(formData);
    state.tableData = res.records || [];
    state.total = res.total || 0;
}
watch([() => formData.page, () => formData.size], () => {
    getList();
});

// 处理时间选择
watch(() => state.time, (val) => {
    if (val) {
        formData.startTime = dayjs(val[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss'); // 当天 00:00:00
        formData.endTime = dayjs(val[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss');     // 当天 23:59:59
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
<style lang="scss" scoped></style>