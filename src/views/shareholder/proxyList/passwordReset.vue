<template>
    <el-dialog v-model="show" title="密码重置" width="500" @close="formDataRef.resetFields()">
        <el-form ref="formDataRef" :model="formData" :rules="rules" label-width="auto" label-position="top">
            <el-form-item label="股东ID">
                <el-input v-model="formData.adminId" disabled placeholder="请输入股东ID" />
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input v-model="formData.newPassword" placeholder="请输入新密码" />
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
import { defineProps, defineEmits, computed, ref, reactive, toRef, watch } from "vue";
import { resetShareholderPassword } from "@/api/page/common.js";
import { toDecimal } from '@/utils/utils.js';
import { ElMessage } from "element-plus";

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    adminId: {
        type: [String, Number],
        required: true
    }
})

const formDataRef = ref(null);
const loading = ref(false);

const formData = reactive({
    adminId: '',
    newPassword: '',
})

const rules = reactive({
    newPassword: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
    ],
})

const emit = defineEmits(['update:show', 'refresh'])
const show = computed({
    get() {
        return props.show
    },
    set(value) {
        emit('update:show', value)
    }
})

// 比例确定
const sure = () => {
    formDataRef.value.validate(async (valid) => {
        if (valid) {
            try {
                loading.value = true;
                await resetShareholderPassword(formData);
                ElMessage.success("密码重置成功");
                show.value = false; // 关闭对话框
                emit('refresh');

            } catch (error) {
                ElMessage.error(error.response.data.error);
            } finally {
                loading.value = false;
            }
        } else {
            ElMessage.error("请填写完整信息");
            return false;
        }
    })
}

watch(() => props.show, (newVal) => {
    if (newVal) {
        formData.adminId = props.adminId;
    }
})
</script>

<style lang="scss" scoped>
:deep(.el-input__inner) {
    text-align: left;
}
</style>