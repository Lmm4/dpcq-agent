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
                <el-input v-model="formData.tableId" placeholder="请输入局号" clearable />
            </el-form-item> -->
            <el-form-item label="游戏类型">
                <el-select v-model="formData.gameCode" clearable placeholder="请选择游戏类型" style="width: 240px">
                    <el-option v-for="item in getDict('wmGameType')" :key="item.value" :label="item.label"
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
            <el-table-column prop="userInfoDTO.userId" label="用户ID" align="center" width="140" />
            <el-table-column prop="userInfoDTO.username" label="用户账号" align="center" width="140" />
            <!-- <el-table-column align="center" width="180">
                <template #header>
                    <div>上级</div>
                    <div>(大股东/股东/代理)</div>
                </template>
<template #default="{ row }">
                    <div>{{ row.userInfoDTO.fullName.join('/') }}</div>
                </template>
</el-table-column> -->
            <el-table-column prop="wmBetLog.gameName" label="游戏类型" align="center" width="140" />
            <el-table-column prop="wmBetLog.event" label="局号" align="center" width="180" />
            <el-table-column prop="wmBetLog.tableId" label="桌台ID" align="center" width="140" />
            <!-- <el-table-column prop="agentUrl" label="桌台名称" align="center" width="220" /> -->
            <el-table-column prop="wmBetLog.bet" label="本局压分" align="center" width="140" />
            <el-table-column prop="wmBetLog.winLoss" label="本局得分" align="center" width="140" />
            <!-- <el-table-column prop="wmBetLog.winLoss" label="结算金额" align="center" width="140" /> -->
            <el-table-column prop="wmBetLog.validBet" label="有效投注" align="center" width="140" />
            <el-table-column label="结算时间" align="center" width="180">
                <template #default="{ row }">
                    <div>{{ dayjs(row.wmBetLog?.setTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
                </template>
            </el-table-column>
            <!-- <el-table-column label="交易代码" align="center" width="220" /> -->
            <el-table-column label="游戏回合编号" align="center" width="220">
                <template #default="{ row }">
                    <div>{{ row.wmBetLog?.round }}-{{ row.wmBetLog?.subround }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="wmBetLog.ip" label="客户端IP" align="center" width="220" />
        </el-table>
        <div class="dfcfe mt20">
            <el-pagination v-model:current-page="formData.page" v-model:page-size="formData.size"
                :page-sizes="[5, 10, 20, 25]" layout="total, sizes, prev, pager, next, jumper" :total="state.total" />
        </div>
    </div>
</template>

<script setup>
import { reactive, watch, onMounted } from "vue";
import { getWMOrderDataList } from "@/api/page/orderDataManage.js";
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
    tableId: '',
    startTime: "",
    endTime: "",
    page: 1,
    size: 10,
    parentCode: "",
    gameCode: ""

})
// 获取代理列表
const getList = async () => {
    const res = await getWMOrderDataList(formData);
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