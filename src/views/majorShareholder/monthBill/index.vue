<template>
    <div class="month_bill">
        <el-card>
            <template #header>
                <div class="dfc">
                    <el-icon class="mr20 cursor" @click="backOut">
                        <Back />
                    </el-icon>

                </div>
            </template>
            <div class="dfc mb20">
                <div class="f16 c424 fw5 mr20">月份账单</div>
                <div class="mr20 time_box">
                    <el-date-picker class="w100" v-model="state.time" type="daterange" :shortcuts="shortcuts" />
                </div>
                <el-button type="primary" @click="getMonthBillList">搜索</el-button>
            </div>
            <el-table :data="state.monthBillData" border style="width: 100%" max-height="600">
                <el-table-column prop="startTime" label="日期开始" align="center" width="180" />
                <el-table-column prop="endTime" label="日期结束" align="center" width="180" />
                <el-table-column prop="username" label="股东账号" align="center" width="180" />
                <el-table-column prop="newAgentCount" label="新增代理" align="center" width="180" />
                <el-table-column prop="newPlayerCount" label="新增会员" align="center" width="180" />
                <el-table-column prop="totalPlayerCount" label="会员总数" align="center" width="180" />
                <el-table-column prop="orderCount" label="注单数" align="center" width="180" />
                <el-table-column prop="betAmount" label="流水" align="center" width="180" />
                <el-table-column prop="finalWinLoss" label="输赢总额" align="center" width="220" />
                <el-table-column prop="validBetAmount" label="有效投注" align="center" width="180" />
                <el-table-column prop="promotion" label="活动优惠" align="center" width="220" />
                <el-table-column prop="agentRebate" label="返水" align="center" width="220" />
                <!-- <el-table-column prop="agentLink" label="玩家返水" align="center" width="220" /> -->
                <el-table-column prop="feeAmount" label="手续费" align="center" width="220" />
                <el-table-column label="操作" align="center" width="160" fixed="right">
                    <template #default="{ row }">
                        <el-button type="primary" link @click="generateBillBtn(row)">查看账单</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="dfcsb mt20">
                <div>数据更新有延迟，请稍后刷新网站</div>
                <el-pagination v-model:current-page="state.monthBillFrom.page"
                    v-model:page-size="state.monthBillFrom.size" :page-sizes="[5, 10, 20, 25]"
                    layout="total, sizes, prev, pager, next, jumper" :total="state.monthTotal" />
            </div>
        </el-card>
        <el-card class="mt30">
            <div class="dfc mb20">
                <div class="f16 c424 fw5 mr20">用户账变数据</div>
                <div class="mr20">
                    <el-input v-model="state.gameFrom.username" style="width: 240px" placeholder="请输入会员昵称" />
                </div>
                <div class="mr20 time_box">
                    <el-date-picker class="w100" v-model="state.time1" type="daterange" :shortcuts="shortcuts" />
                </div>
                <el-button type="primary" @click="getUserGameDataFn">搜索</el-button>
            </div>
            <el-table :data="state.gameData" border style="width: 100%" max-height="600">
                <el-table-column prop="date" label="日期" align="center" />
                <el-table-column prop="userId" label="用户ID" align="center" />
                <el-table-column prop="userName" label="会员昵称" align="center" />
                <el-table-column prop="siteName" label="游戏场馆" align="center" />
                <el-table-column prop="gameName" label="游戏项目" align="center" />
                <!-- <el-table-column prop="orderCount" label="注单数" align="center" /> -->
                <!-- <el-table-column prop="betAmount" label="流水" align="center" /> -->
                <el-table-column prop="winLossAmount" label="账变信息" align="center" />
                <!-- <el-table-column prop="validBetAmount" label="有效流水" align="center" /> -->
            </el-table>
            <div class="dfcfe mt20">
                <el-pagination v-model:current-page="state.gameFrom.page" v-model:page-size="state.gameFrom.size"
                    :page-sizes="[5, 10, 20, 25]" layout="total, sizes, prev, pager, next, jumper"
                    :total="state.gameTotal" />
            </div>
        </el-card>
        <generateBill v-model:show="state.billShow" :billInfo="state.billInfo" />
    </div>
</template>

<script setup>
import { reactive, onMounted, watch } from "vue";
import Router from "@/router/index";
import { useRoute } from 'vue-router';
import generateBill from './generateBill.vue';
import { getUserGameData, getShareholderMonthBill } from "@/api/page/common.js";
import { dayjs } from "element-plus";
const route = useRoute();
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
    monthBillData: [],// 月度账单
    time: [],
    time1: [],
    billShow: false,
    monthBillFrom: {
        startDate: "",
        endDate: "",
        page: 1,
        size: 10,
        adminId: "",
    },
    monthTotal: 0,
    gameFrom: {
        startDate: "",
        endDate: "",
        username: "",
        page: 1,
        size: 10
    },
    gameData: [],
    gameTotal: 0,//
    billInfo: {},// 账单信息
})




// 获取月份账单列表
const getMonthBillList = async () => {
    const res = await getShareholderMonthBill(state.monthBillFrom);
    state.monthBillData = res.records;
    state.monthTotal = res.total;
}

// 获取用户游戏数据
const getUserGameDataFn = async () => {
    const res = await getUserGameData(state.gameFrom);
    state.gameData = res.records;
    state.gameTotal = res.total;
}


// 生成账单
const generateBillBtn = (row) => {
    state.billInfo = row;
    state.billShow = true;
}

//  返回到股东列表
const backOut = () => {
    Router.push({ path: "/equityList" });
}


// 月度账单时间监听
watch(() => state.time, (val) => {
    if (val) {
        state.monthBillFrom.startDate = dayjs(val[0]).format('YYYY-MM-DD HH:mm:ss');
        state.monthBillFrom.endDate = dayjs(val[1]).format('YYYY-MM-DD HH:mm:ss');
    } else {
        state.monthBillFrom.startDate = '';
        state.monthBillFrom.endDate = '';
    }
}, { deep: true });

// 用户游戏数据监听
watch(() => state.time1, (val) => {
    if (val) {
        state.gameFrom.startDate = dayjs(val[0]).format('YYYY-MM-DD HH:mm:ss');
        state.gameFrom.endDate = dayjs(val[1]).format('YYYY-MM-DD HH:mm:ss');
    } else {
        state.gameFrom.startDate = '';
        state.gameFrom.endDate = '';
    }
}, { deep: true });

// 月度账单分页监听
watch([() => state.monthBillFrom.page, () => state.monthBillFrom.size], () => {
    getMonthBillList();
});

// 用户游戏分页监听
watch([() => state.gameFrom.page, () => state.gameFrom.size], () => {
    getUserGameDataFn();
});

onMounted(() => {
    state.monthBillFrom.adminId = route.query.id;
    getMonthBillList();
    getUserGameDataFn();

})
</script>

<style lang="scss" scoped>
.month_bill {
    width: 100%;
    height: 100%;

    .time_box {
        max-width: 400px;

        :deep(.el-date-editor) {
            width: 100% !important;
            box-sizing: border-box;
        }
    }
}
</style>