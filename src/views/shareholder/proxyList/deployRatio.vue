<template>
    <el-dialog v-model="show" title="比例配置" width="500" @close="formDataRef.resetFields()">
        <el-form ref="formDataRef" :model="formData" :rules="rules" label-width="auto" label-position="top">
            <el-form-item label="代理分润比例" prop="subProfit">
                <el-input-number class="w100" v-model="formData.subProfit" placeholder="请输入代理分润比例" :controls="false"
                    :min="0" :max="100">
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
import { defineProps, defineEmits, computed, ref, reactive, toRef, watch } from "vue";
import { deployShareholderRatio, getShareholderRatio } from "@/api/page/common.js";
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

const adminId = toRef(props, 'adminId');


const formData = reactive({
    parentId: '',
    parentProfit: null,
    subProfit: null,
    subId: ''
})

const rules = reactive({
    parentProfit: [
        { required: true, message: '请输入代理昵称', trigger: 'blur' },
    ],

    subProfit: [
        { required: true, message: '请输入代理分润比例', trigger: 'blur' },
    ],
})

const emit = defineEmits(['update:show', 'refresh']);
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
                let primary = { ...formData };
                primary.parentProfit = toDecimal(primary.parentProfit);
                primary.subProfit = toDecimal(primary.subProfit);
                await deployShareholderRatio(primary);
                ElMessage.success("比例配置成功");
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

// 获取下级分润比例
const getShareholderRatioFn = async () => {
    const res = await getShareholderRatio({ adminId: adminId.value });
    Object.assign(formData, {
        ...res,
        parentProfit: res.parentProfit * 100,
        subProfit: res.subProfit * 100
    });
}

watch(() => props.show, (newVal) => {
    if (newVal) {
        getShareholderRatioFn();
    } else {
        formData.subProfit = null;
    }
})
</script>

<style lang="scss" scoped>
:deep(.el-input__inner) {
    text-align: left;
}
</style>