<template>
    <div class="equity_list">
        <div class="mb20 f24 fw7">股东列表</div>
        <el-card>
            <template #header>
                <div class="dfcsb">
                    <div class="dfc">
                        <div class="mr20 name">股东昵称</div>
                        <el-input class="mr20" v-model="fromData.name" placeholder="请输入股东昵称" clearable />
                        <el-button type="primary" @click="getList">搜索</el-button>

                    </div>
                    <el-button type="primary" @click="state.addShow = true">添加股东</el-button>
                </div>
            </template>
            <el-table :data="state.tableData" border style="width: 100%">
                <el-table-column prop="adminId" label="股东编号" align="center" width="120" />
                <el-table-column prop="username" label="股东账号" align="center" width="180" />
                <el-table-column prop="agentCount" label="股东下级代理数量" align="center" width="180" />
                <el-table-column prop="memberCount" label="旗下所有会员数量" align="center" width="180" />
                <el-table-column prop="finalWinLoss" label="输赢额" align="center" width="180" />
                <el-table-column prop="totalRebateAmount" label="总返水金额" align="center" width="180" />
                <el-table-column prop="totalRebateAmount" label="有效流水" align="center" width="180" />
                <el-table-column prop="totalRebateAmount" label="有效投注" align="center" width="180" />
                <el-table-column prop="shareholderProfitPercent" label="股东分润比例" align="center" width="170">
                    <template #default="{ row }">
                        <div>{{ row.shareholderProfitPercent * 100 }}%</div>
                    </template>
                </el-table-column>
                <el-table-column prop="shareholderUrl" label="股东后台链接" align="center" min-width="220" />
                <el-table-column label="操作" align="center" width="210" fixed="right">
                    <template #default="{ row }">
                        <el-button type="primary" link @click="monthBill(row.adminId)">月度账单</el-button>
                        <el-button type="primary" link @click="configBtn(row.adminId)">配置</el-button>
                        <el-button type="primary" link @click="resetBtn(row.adminId)">密码重置</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="dfcfe mt20">
                <el-pagination v-model:current-page="fromData.page" v-model:page-size="fromData.size"
                    :page-sizes="[5, 10, 20, 25]" layout="total, sizes, prev, pager, next, jumper"
                    :total="state.total" />
            </div>
        </el-card>
        <div class=" mt20 f24 fw7">注单数据表</div>
        <orderDataManage />
        <addEquity v-model:show="state.addShow" @refresh="getList" />
        <deployRatio v-model:show="state.ratioShow" :adminId="state.adminId" @refresh="getList" />
        <passwordReset v-model:show="state.resetShow" :adminId="state.adminId" @refresh="getList" />
    </div>
</template>

<script setup>
import { reactive, watch } from "vue";
import addEquity from "./addEquity.vue";
import deployRatio from "./deployRatio.vue";
import passwordReset from "./passwordReset.vue";
import orderDataManage from '@/views/orderDataManage/index.vue';
import Router from "@/router/index";
import { getShareholderList } from "@/api/page/major.js";


const state = reactive({
    tableData: [],//股东列表
    addShow: false,
    ratioShow: false,
    resetShow: false,
    total: 0,
    adminId: "",//股东账号
})

const fromData = reactive({
    name: "",
    page: 1,
    size: 10
})



// 获取股东列表
const getList = async () => {
    const res = await getShareholderList(fromData);
    // console.log(res);
    state.tableData = res.records;
    state.total = res.total;
}


// 配置
const configBtn = (adminId) => {
    state.ratioShow = true;
    state.adminId = adminId;
}

// 密码重置
const resetBtn = (adminId) => {
    state.adminId = adminId;
    state.resetShow = true;
}
// 月度账单
const monthBill = (id) => {
    Router.push({ path: `equityList/monthBill`, query: { id } });
}

watch([() => fromData.page, () => fromData.size], () => {
    getList();
});

getList();
</script>

<style lang="scss" scoped>
.equity_list {
    width: 100%;
    height: 100%;

    .name {
        width: 110px;
    }
}
</style>