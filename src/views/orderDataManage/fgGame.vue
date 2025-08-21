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
                    <el-option v-for="item in getDict('fgGameType')" :key="item.value" :label="item.label"
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
            <el-table-column prop="username" label="用户账号" align="center" width="140" />
            <el-table-column label="游戏类型" align="center" width="180">
                <template #default="{ row }">
                    <div>{{ getDictLabel('fgGameType', row.gameType) }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="deviceName" label="设备名" align="center" width="140" />
            <el-table-column prop="endChips" label="结束筹码" align="center" width="140" />
            <el-table-column prop="allBets" label="总投注" align="center" width="140" />
            <el-table-column prop="result" label="总输赢" align="center" width="140" />
            <el-table-column prop="allWins" label="总奖金" align="center" width="140" />
            <el-table-column prop="jackpotBonus" label="jackpot 奖金" align="center" width="140" />
            <el-table-column label="投注时间" align="center" width="220">
                <template #default="{ row }">
                    <div>{{ dayjs(row.betTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="totalBets" label="总下注" align="center" width="140" />
            <el-table-column prop="roundId" label="牌局ID" align="center" width="140" />
            <el-table-column prop="typeName" label="捕鱼场景" align="center" width="140" />
            <el-table-column prop="bulletCount" label="子弹个数" align="center" width="140" />
            <el-table-column prop="startChips" label="开始筹码" align="center" width="140" />
        </el-table>
        <div class="dfcfe mt20">
            <el-pagination v-model:current-page="formData.page" v-model:page-size="formData.size"
                :page-sizes="[5, 10, 20, 25]" layout="total, sizes, prev, pager, next, jumper" :total="state.total" />
        </div>
    </div>
</template>

<script setup>
import { reactive, watch, onMounted } from "vue";
import { dayjs } from "element-plus";
import { localGet } from "@/utils/local.js";
import { getDict, getDictLabel } from "@/utils/dict.js";
import { getFGOrderDataList } from "@/api/page/orderDataManage.js";
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
    activeName: "",
    time: [],
});

const formData = reactive({
    playerName: "",
    userId: "",
    gameType: "",
    startTime: "",
    endTime: "",
    page: 1,
    size: 10,
    parentCode: ""
})
// 获取代理列表
const getList = async () => {
    const res = await getFGOrderDataList(formData);
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