<template>
    <el-dialog v-model="show" title="添加代理" width="500" @close="addFormRef.resetFields()">
        <el-form ref="addFormRef" :model="formData" :rules="rules" label-width="auto" label-position="top">
            <el-form-item label="代理域名配置" prop="agentUrl">
                <el-input v-model="formData.agentUrl" placeholder="请输入代理域名" />
            </el-form-item>
            <el-form-item label="代理昵称" prop="realName">
                <el-input v-model="formData.realName" placeholder="请输入代理昵称" />
            </el-form-item>
            <el-form-item label="代理账号" prop="username">
                <el-input v-model="formData.username" placeholder="请输入代理账号" />
            </el-form-item>
            <el-form-item label="代理密码" prop="password">
                <el-input v-model="formData.password" placeholder="请输入代理密码" />
            </el-form-item>
            <el-form-item label="代理分润比例" prop="agentProfitPercent">
                <el-input-number class="w100" v-model="formData.agentProfitPercent"
                    :placeholder="`请输入旗下代理分润比例,最大${maxProfit * 100 || 0}%`" :controls="false" :min="0"
                    :max="maxProfit * 100">
                    <template #suffix>
                        <span>%</span>
                    </template>
                </el-input-number>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="show = false">取消</el-button>
                <el-button type="primary" @click="sure" :loading="loading">确定</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref, reactive } from "vue";
import { addProxy } from "@/api/page/shareholder.js";
import { toDecimal } from '@/utils/utils.js';

import { localGet } from "@/utils/local.js";
import { ElMessage } from "element-plus";
const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
})

const addFormRef = ref(null);
const loading = ref(false);


const formData = reactive({
    agentProfitPercent: null,
    agentUrl: '',
    realName: '',
    username: '',
    password: '',
})

const rules = reactive({
    agentUrl: [
        { required: true, message: '请输入代理域名', trigger: 'blur' },
    ],
    realName: [
        { required: true, message: '请输入代理昵称', trigger: 'blur' },
    ],
    username: [
        { required: true, message: '请输入代理账号', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入代理密码', trigger: 'blur' },
    ],
    agentProfitPercent: [
        { required: true, message: '请输入旗下代理分润比例', trigger: 'blur' },
    ],
})
const maxProfit = localGet('userInfo').profitRate;

const emit = defineEmits(['update:show', 'refresh'])
const show = computed({
    get() {
        return props.show
    },
    set(value) {
        emit('update:show', value)
    }
})

// 新增代理
const sure = () => {
    addFormRef.value.validate(async (valid) => {
        if (valid) {
            try {
                loading.value = true;
                let primary = { ...formData };
                primary.agentProfitPercent = toDecimal(primary.agentProfitPercent);
                await addProxy(primary);
                ElMessage.success('新增代理成功');
                emit('refresh');
                show.value = false;
            } catch (error) {
                ElMessage.error(error.response.data.error);
            } finally {
                loading.value = false;
            }
        }
    })
}
</script>

<style lang="scss" scoped>
:deep(.el-input__inner) {
    text-align: left;
}
</style>