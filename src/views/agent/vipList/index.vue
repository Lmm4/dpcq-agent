<template>
    <div class="vip_list">
        <div class="mb20 f24 fw7">会员列表</div>
        <el-card>
            <template #header>
                <el-form :inline="true" :model="fromData" class="form_inline">
                    <el-form-item label="用户ID">
                        <el-input v-model="fromData.userId" placeholder="请输入用户ID" clearable />
                    </el-form-item>
                    <el-form-item label="用户账号">
                        <el-input v-model="fromData.account" placeholder="请输入用户账号" clearable />
                    </el-form-item>
                    <el-form-item label="昵称">
                        <el-input v-model="fromData.nick" placeholder="请输入昵称" clearable />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getList">搜索</el-button>
                    </el-form-item>
                    <el-form-item label="会员邀请链接">
                        <el-input v-model="state.copyLink" readonly style="width: 330px">
                            <template #append>
                                <div class="cursor btn dfcc" @click="copyLinkBtn">复制</div>
                            </template>
                        </el-input>
                    </el-form-item>
                </el-form>
            </template>
            <el-table :data="state.tableData" border style="width: 100%">
                <el-table-column prop="userId" label="用户ID" align="center" width="auto" />
                <el-table-column prop="account" label="用户账号" align="center" width="auto" />
                <!-- <el-table-column prop="country" label="国家设置" align="center" width="auto" /> -->
                <el-table-column prop="name" label="昵称" align="center" width="auto" />
                <!-- <el-table-column prop="rebate" label="可提现反水" align="center" width="auto" />
                <el-table-column prop="rebateFrozen" label="冻结反水" align="center" width="auto" /> -->
                <!-- <el-table-column prop="todayValidBet" label="今日有效流水" align="center" width="auto" /> -->
                <el-table-column prop="winLoss" label="输赢总额" align="center" width="auto" />
                <!-- <el-table-column prop="validBet" label="总有效流水" align="center" width="auto" /> -->
                <!-- <el-table-column prop="point" label="积分" align="center" width="auto" /> -->
                <el-table-column prop="wallet" label="个人钱包余额" align="center" width="auto" />
                <el-table-column prop="deposit" label="累计总充值" align="center" width="auto" />
                <el-table-column prop="withdraw" label="累计总提现" align="center" width="auto" />
                <!-- <el-table-column label="操作" align="center" width="auto" fixed="right">
                    <template #default="{ row }">
                        <el-button type="primary" link @click="viewRecord(row.userId)">查看记录</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
            <div class="dfcfe mt20">
                <el-pagination v-model:current-page="fromData.page" v-model:page-size="fromData.size"
                    :page-sizes="[5, 10, 20, 25]" layout="total, sizes, prev, pager, next, jumper"
                    :total="state.total" />
            </div>
        </el-card>
        <div class=" mt20 f24 fw7">注单数据表</div>
        <orderDataManage />
        <userGameData v-model:show="state.gameShow" :userId="state.userId" />
    </div>
</template>

<script setup>
import { reactive, watch, onMounted } from "vue";
import userGameData from "./userGameData.vue";
import { ElMessage } from "element-plus";
import orderDataManage from '@/views/orderDataManage/index.vue';
import { getAgentList } from "@/api/page/agent.js";
import { localGet } from "@/utils/local.js";
const h5Url = import.meta.env.VITE_H5_URL;


const state = reactive({
    tableData: [],
    gameShow: false,
    userId: "",
    total: 0,
    copyLink: ''
})

const fromData = reactive({
    userId: "",
    account: "",
    nick: "",
    page: 1,
    size: 10
})


// 复制链接
const copyLinkBtn = () => {
    navigator.clipboard.writeText(state.copyLink).then(() => {
        ElMessage.success('链接已复制到剪贴板');
    }).catch(() => {
        ElMessage.error('复制失败，请手动复制');
    });
}

// 获取月度账单列表
const getList = async () => {
    const res = await getAgentList(fromData);
    state.tableData = res.records;
    state.total = res.total;
}


// 查看记录
const viewRecord = (id) => {
    state.userId = id;
    state.gameShow = true;
}
watch([() => fromData.page, () => fromData.size], () => {
    getList();
});

onMounted(() => {
    state.copyLink = `${h5Url}?code=${localGet('userInfo').inviteCode}`;
})

getList();
</script>

<style lang="scss" scoped>
.vip_list {
    width: 100%;
    height: 100%;

    .form_inline {

        :deep(.el-form-item) {
            margin-bottom: 0;
        }
    }


    :deep(.el-input-group__append) {
        padding: 0;

        .btn {
            width: 68px;
        }
    }
}
</style>