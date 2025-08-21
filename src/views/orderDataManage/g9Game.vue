<template>
    <div>
        <el-form :inline="true" :model="formData">
            <el-form-item label="用户ID">
                <el-input v-model="formData.userId" placeholder="请输入用户ID" clearable />
            </el-form-item>
            <el-form-item label="用户账号">
                <el-input v-model="formData.playerName" placeholder="请输入用户账号" clearable />
            </el-form-item>
            <el-form-item label="游戏类型">
                <el-select v-model="formData.gameType" clearable placeholder="请选择游戏类型" style="width: 240px">
                    <el-option v-for="item in getDict('g9GameType')" :key="item.value" :label="item.label"
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
            <el-table-column prop="userId" label="用户ID" align="center" width="140" />
            <el-table-column prop="userName" label="用户账号" align="center" width="140" />
            <el-table-column prop="no" label="订单号" align="center" width="220" />
            <el-table-column prop="gameName" label="游戏名称" align="center" width="180" />
            <el-table-column label="游玩时间" align="center" width="180">
                <template #default="{ row }">
                    <div>{{ dayjs(row.gameDate).format('YYYY-MM-DD HH:mm:ss') }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="gameTypeName" label="游戏类型" align="center" width="180" />
            <el-table-column prop="bet" label="投注金额" align="center" width="120" />
            <el-table-column prop="validbet" label="有效投注" align="center" width="120" />
            <el-table-column prop="win" label="游戏赢" align="center" width="120" />
            <el-table-column prop="netWin" label="总输赢" align="center" width="120" />
            <el-table-column prop="preAmount" label="转帐前金额" align="center" width="130" />
            <el-table-column prop="aftAmount" label="转帐后金额" align="center" width="130" />
            <el-table-column label="结算时间" align="center" width="220">
                <template #default="{ row }">
                    <div>{{ dayjs(row.awardTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
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
import { get9GOrderDataList } from "@/api/page/orderDataManage.js";
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
    playerName: '',
    userId: '',
    gameType: '',
    page: 1,
    size: 10,
    parentCode: "",
    startTime: "",
    endTime: "",
})
// 获取代理列表
const getList = async () => {
    const res = await get9GOrderDataList(formData);
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