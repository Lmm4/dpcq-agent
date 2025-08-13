<template>
    <el-dialog v-model="show" title="用户游戏数据" width="90%">
        <el-table :data="state.tableData" border style="width: 100%">
            <el-table-column prop="date" label="日期" align="center" />
            <el-table-column prop="userId" label="用户ID" align="center" />
            <el-table-column prop="userName" label="会员昵称" align="center" />
            <el-table-column prop="siteName" label="游戏场馆" align="center" />
            <el-table-column prop="gameName" label="游戏项目" align="center" />
            <!-- <el-table-column prop="orderCount" label="注单数" align="center" /> -->
            <el-table-column prop="betAmount" label="流水" align="center" />
            <el-table-column prop="validBetAmount" label="有效投注" align="center" />
            <el-table-column prop="winLossAmount" label="输赢总额" align="center" />
        </el-table>
        <div class="dfcfe mt20">
            <el-pagination v-model:current-page="formData.page" v-model:page-size="formData.size"
                :page-sizes="[5, 10, 20, 25]" layout="total, sizes, prev, pager, next, jumper" :total="state.total" />
        </div>
    </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref, reactive, toRef, watch } from "vue";
import { getUserGameData } from "@/api/page/agent.js";

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    userId: {
        type: [String, Number],
        required: true
    }
})
const userId = toRef(props, 'userId');
const state = reactive({
    tableData: [],
    total: 0
})

const formData = reactive({
    userId: '',
    page: 1,
    size: 10
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

// 获取用户游戏数据
const getUserGameDataFn = async () => {
    const res = await getUserGameData(formData);
    state.tableData = res.records;
    state.total = res.total;
}

watch([() => formData.page, () => formData.size], () => {
    getUserGameDataFn();
});

watch(() => props.show, (newVal) => {
    if (newVal) {
        formData.userId = userId.value;
        getUserGameDataFn();
    }
})
</script>

<style lang="scss" scoped></style>