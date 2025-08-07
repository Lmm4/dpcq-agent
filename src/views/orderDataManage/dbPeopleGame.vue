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
                <el-input v-model="formData.roundNo" placeholder="请输入局号" clearable />
            </el-form-item> -->
            <el-form-item label="游戏类型">
                <el-select v-model="formData.gameTypeId" clearable placeholder="请选择游戏类型" style="width: 240px">
                    <el-option v-for="item in getDict('dbPeopleGameType')" :key="item.value" :label="item.label"
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
            <el-table-column type="expand">
                <template #default="{ row }">
                    <el-table :data="row.dbBetList" border>
                        <el-table-column label="交易单号" prop="transferNo" align="center" />
                        <el-table-column label="下注总金额正数" prop="betTotalAmount" align="center" />
                        <el-table-column label="下注操作过后的余额" prop="betAfterAmount" align="center" />
                        <el-table-column label="下注时间" align="center">
                            <template #default="{ row }">
                                <div>{{ dayjs(row.betTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column prop="userInfo.userId" label="用户ID" align="center" width="140" />
            <el-table-column prop="userInfo.username" label="用户账号" align="center" width="140" />
            <!-- <el-table-column align="center">
                <template #header>
                    <div>上级</div>
                    <div>(大股东/股东/代理)</div>
                </template>
                <template #default="{ row }">
                    <div>{{ row.userInfo.fullName.join('/') }}</div>
                </template>
            </el-table-column> -->
            <el-table-column prop="dbGamePayout.transferNo" label="交易单号" align="center" />
            <el-table-column label="游戏类型" align="center">
                <template #default="{ row }">
                    <div>{{ getDictLabel('dbPeopleGameType', row.dbGamePayout?.gameTypeId) }}</div>
                </template>
            </el-table-column>
            <el-table-column label="派彩时间" align="center">
                <template #default="{ row }">
                    <div>{{ dayjs(row.dbGamePayout?.payoutTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="dbGamePayout.roundNo" label="局号" align="center" />
            <el-table-column prop="dbGamePayout.payoutAmount" label="派彩金额" align="center" width="120" />
            <el-table-column prop="dbGamePayout.payoutAfterAmount" label="派彩过后的金额" align="center" width="140" />
            <el-table-column label="业务类型" align="center" width="140">
                <template #default="{ row }">
                    <div>{{ getDictLabel('businessType', row.dbGamePayout?.transferType) }}</div>
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
import { getDBOrderDataList } from "@/api/page/orderDataManage.js";
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
    roundNo: '',
    username: '',
    parentCode: "",
    startTime: "",
    endTime: "",
    gameTypeId: '',
    page: 1,
    size: 10
})
// 获取代理列表
const getList = async () => {
    const res = await getDBOrderDataList(formData);
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