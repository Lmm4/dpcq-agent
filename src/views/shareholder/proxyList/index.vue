<template>
    <div class="proxy_list">
        <el-card>
            <template #header>
                <div class="dfcsb">
                    <div class="dfc">
                        <div class="mr20 name">代理昵称</div>
                        <el-input class="mr20" v-model="fromData.name" placeholder="请输入代理昵称" clearable />
                        <el-button type="primary" @click="getList">搜索</el-button>

                    </div>
                    <el-button type="primary" @click="state.addShow = true">添加代理</el-button>
                </div>
            </template>
            <el-table :data="state.tableData" border style="width: 100%">
                <el-table-column prop="adminId" label="代理编号" align="center" width="180" />
                <el-table-column prop="realName" label="代理昵称" align="center" width="180" />
                <el-table-column prop="memberCount" label="旗下会员数量" align="center" width="180" />
                <el-table-column prop="finalWinLoss" label="总输赢金额" align="center" width="180" />
                <el-table-column prop="totalRebateAmount" label="总返水金额" align="center" width="180" />
                <el-table-column prop="agentProfitPercent" label="代理分润比例" align="center" width="180">
                    <template #default="{ row }">
                        <div>{{ row.agentProfitPercent * 100 }}%</div>
                    </template>
                </el-table-column>
                <el-table-column prop="agentUrl" label="代理后台链接" align="center" width="220" />
                <el-table-column prop="statAddAt" label="代理添加时间" align="center" width="220">
                    <template #default="{ row }">
                        <div>{{ dayjs(row.statAddAt).format('YYYY-MM-DD HH:mm:ss') }}</div>
                    </template>
                </el-table-column>
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
        <addProxy v-model:show="state.addShow" @refresh="getList" />
        <deployRatio v-model:show="state.ratioShow" :adminId="state.adminId" @refresh="getList" />
        <passwordReset v-model:show="state.resetShow" :adminId="state.adminId" @refresh="getList" />
    </div>
</template>

<script setup>
import { reactive, watch } from "vue";
import addProxy from "./addProxy.vue";
import deployRatio from "./deployRatio.vue";
import passwordReset from "./passwordReset.vue";
import Router from "@/router/index";
import { dayjs } from "element-plus";

import { getProxyList } from "@/api/page/shareholder.js";


const state = reactive({
    tableData: [],// 代理列表
    addShow: false,
    ratioShow: false,
    resetShow: false,
    total: 0,
    adminId: "",//代理账号
})

const fromData = reactive({
    name: "",
    page: 1,
    size: 10
})

// 配置
const configBtn = (adminId) => {
    state.ratioShow = true;
    state.adminId = adminId;
}

// 获取代理列表
const getList = async () => {
    const res = await getProxyList(fromData);
    state.tableData = res.records || [];
    state.total = res.total || 0;
}

// 密码重置
const resetBtn = (adminId) => {
    state.adminId = adminId;
    state.resetShow = true;
}

// 月度账单
const monthBill = (id) => {
    Router.push({ path: `/proxyList/monthBill`, query: { id } });
}


watch([() => fromData.page, () => fromData.size], () => {
    getList();
});
getList();
</script>

<style lang="scss" scoped>
.proxy_list {
    width: 100%;
    height: 100%;

    .name {
        width: 110px;
    }
}
</style>