<template>
    <el-dialog v-model="show" title="生成账单" width="80%">
        <el-table :data="state.tableData" border style="width: 100%">
            <el-table-column prop="username" label="股东昵称" align="center" />
            <el-table-column prop="finalWinLoss" label="输赢总额" align="center" />
            <el-table-column prop="feeAmount" label="手续费" align="center" />
            <el-table-column prop="siteFeeAmount" label="场馆费" align="center" />
            <el-table-column prop="totalAmount" label="总计" align="center" />
            <el-table-column prop="adminProfit" align="center">
                <template #header>
                    <div>股东分润{{ state.shareTitle }}%</div>
                </template>
            </el-table-column>
            <el-table-column prop="agentProfit" align="center">
                <template #header>
                    <div>代理分润{{ state.agentTitle }}%</div>
                </template>
            </el-table-column>
            <el-table-column prop="settleAmount" label="结算" align="center" />
        </el-table>
        <template #footer>
            <div class="dialog-footer">
                <!-- <el-button @click="show = false">取消</el-button> -->
                <el-button type="danger" @click="show = false">已确认收取佣金，并确认结算，请点击按钮</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref, reactive, watch } from "vue";
import { generateBill } from "@/api/page/common.js";

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    billInfo: {
        type: Object,
        required: true
    }
})

const state = reactive({
    tableData: [],
    shareTitle: 0,
    agentTitle: 0
})



const emit = defineEmits(['update:show'])
const show = computed({
    get() {
        return props.show
    },
    set(value) {
        emit('update:show', value)
    }
})

const getInfo = async () => {
    const res = await generateBill(props.billInfo);
    state.shareTitle = res.adminProfitRate * 100;
    state.agentTitle = res.agentProfitRate * 100;
    state.tableData.push(res);

}

watch(() => props.show, (newVal) => {
    if (newVal) {
        getInfo();
    } else {
        state.tableData = [];
        state.shareTitle = 0;
        state.agentTitle = 0;
    }
})
</script>

<style lang="scss" scoped></style>