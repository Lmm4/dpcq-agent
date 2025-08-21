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
            <el-table-column prop="dbtyGameDataHistory.orderNo" label="注单ID" align="center" width="200" />
            <el-table-column prop="dbtyGameDataHistory.orderAmount" label="下注金额" align="center" width="140" />
            <el-table-column prop="dbtyGameDataHistory.orderAmount" label="有效下注金额" align="center" width="140" />
            <el-table-column prop="dbtyGameDataHistory.settleAmount" label="结算金额" align="center" width="140" />
            <el-table-column prop="dbtyGameDataHistory.profitAmount" label="盈利金额" align="center" width="140" />
            <el-table-column label="订单结算结果" align="center" width="140">
                <template #default="{ row }">
                    <div>{{ getDictLabel('dbSportResult', row.dbtyGameDataHistory.outcome) }}</div>
                </template>
            </el-table-column>
            <el-table-column label="赛事类型" align="center" width="140">
                <template #default="{ row }">
                    <div>{{ getDictLabel('dbSportType', row.dbtyGameDataHistory.matchCode) }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="dbtyGameDataHistory.ip" label="IP 地址" align="center" width="140" />
            <el-table-column label="结算时间" align="center" width="220">
                <template #default="{ row }">
                    <div>{{ dayjs(row.dbtyGameDataHistory.settleTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="140" fixed="right">
                <template #default="{ row }">
                    <el-button type="primary" link
                        @click="handleDetail(row.dbtyGameDataHistory.detailList)">明细列表</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="dfcfe mt20">
            <el-pagination v-model:current-page="formData.page" v-model:page-size="formData.size"
                :page-sizes="[5, 10, 20, 25]" layout="total, sizes, prev, pager, next, jumper" :total="state.total" />
        </div>
        <el-dialog v-model="state.detailShow" title="明细列表" width="80%">
            <el-table :data="state.gridData" border>
                <el-table-column property="betNo" label="投注项编号" align="center" width="150" />
                <el-table-column label="比赛开始时间" align="center" width="200">
                    <template #default="{ row }">
                        <div>{{ dayjs(row.beginTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
                    </template>
                </el-table-column>
                <el-table-column property="betAmount" label="注单金额" align="center" width="140" />
                <el-table-column property="matchName" label="联赛名称" align="center" width="200" />
                <el-table-column property="matchInfo" label="比赛对阵" align="center" width="230" />
                <el-table-column label="投注类型" align="center" width="140">
                    <template #default="{ row }">
                        <div>{{ getDictLabel('dbSportBetType', row.matchType) }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="盘口类型" align="center" width="140">
                    <template #default="{ row }">
                        <div>{{ getDictLabel('dbSportOddsType', row.marketType) }}</div>
                    </template>
                </el-table-column>
                <el-table-column property="sportName" label="游戏名称" align="center" width="140" />
                <el-table-column property="playOptionName" label="投注项名称" align="center" width="200" />
                <el-table-column property="playName" label="玩法名称" align="center" width="140" />
                <el-table-column property="marketValue" label="盘口值" align="center" width="140" />
                <el-table-column property="handicap" label="让球值" align="center" width="140" />
                <el-table-column label="注单结算结果" align="center" width="140">
                    <template #default="{ row }">
                        <div>{{ getDictLabel('dbSportResult', row.betResult) }}</div>
                    </template>
                </el-table-column>
                <el-table-column property="oddFinally" label="最终赔率" align="center" width="140" />
            </el-table>
        </el-dialog>
    </div>
</template>

<script setup>
import { reactive, watch, onMounted } from "vue";
import { getDBSportOrderDataList } from "@/api/page/orderDataManage.js";
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
    detailShow: false,
    gridData: []
});

const formData = reactive({
    userId: '',
    username: '',
    parentCode: "",
    startTime: "",
    endTime: "",
    page: 1,
    size: 10
})

// 详情列表
const handleDetail = (list) => {
    state.gridData = list;
    state.detailShow = true;
}

// 获取代理列表
const getList = async () => {
    const res = await getDBSportOrderDataList(formData);
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
<style lang="scss" scoped></style>
<style lang="scss" scoped></style>