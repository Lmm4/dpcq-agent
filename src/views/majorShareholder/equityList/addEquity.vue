<template>
    <el-dialog v-model="show" title="添加股东" width="500" @close="addFormRef.resetFields()">
        <el-form ref="addFormRef" :model="formData" :rules="rules" label-width="auto" label-position="top">
            <el-form-item label="股东域名配置" prop="shareholderBackendUrl">
                <el-input v-model="formData.shareholderBackendUrl" placeholder="请输入股东域名" />
            </el-form-item>
            <el-form-item label="股东昵称" prop="realName">
                <el-input v-model="formData.realName" placeholder="请输入股东昵称" />
            </el-form-item>
            <el-form-item label="股东账号" prop="username">
                <el-input v-model="formData.username" placeholder="请输入股东账号" />
            </el-form-item>
            <el-form-item label="股东密码" prop="password">
                <el-input v-model="formData.password" placeholder="请输入股东密码" />
            </el-form-item>
            <el-form-item label="旗下股东分润比例" prop="shareholderProfitPercent">
                <el-input-number class="w100" v-model="formData.shareholderProfitPercent"
                    :placeholder="`请输入旗下股东分润比例,最大${maxProfit * 100 || 0}%`" :controls="false" :min="0"
                    :max="maxProfit * 100">
                    <template #suffix>
                        <span>%</span>
                    </template>
                </el-input-number>
            </el-form-item>
            <!-- <el-form-item label="旗下代理分润比例" prop="agentProfitPercent">
                <el-input-number class="w100" v-model="formData.agentProfitPercent" placeholder="请输入旗下代理分润比例"
                    :controls="false" :min="0" :max="100">
                    <template #suffix>
                        <span>%</span>
                    </template>
                </el-input-number>
            </el-form-item> -->
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
import { defineProps, defineEmits, computed, ref, reactive, watch } from "vue";
import { addShareholder } from "@/api/page/major.js";
import { toDecimal } from '@/utils/utils.js';
import { ElMessage } from "element-plus";
import { localGet } from "@/utils/local.js";


const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
})

const addFormRef = ref(null);
const loading = ref(false);


const formData = reactive({
    shareholderBackendUrl: '',
    realName: '',
    username: '',
    password: '',
    shareholderProfitPercent: null,
    // agentProfitPercent: null,
})

const rules = reactive({
    shareholderBackendUrl: [
        { required: true, message: '请输入股东域名', trigger: 'blur' },
    ],
    realName: [
        { required: true, message: '请输入股东昵称', trigger: 'blur' },
    ],
    username: [
        { required: true, message: '请输入股东账号', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入股东密码', trigger: 'blur' },
    ],
    shareholderProfitPercent: [
        { required: true, message: '请输入旗下股东分润比例', trigger: 'blur' },
    ],
    agentProfitPercent: [
        { required: true, message: '请输入旗下代理分润比例', trigger: 'blur' },
    ],
})

const maxProfit = localGet('userInfo').profitRate;

const emit = defineEmits(['update:show', 'refresh']);
const show = computed({
    get() {
        return props.show
    },
    set(value) {
        emit('update:show', value)
    }
})



// 确定新增
const sure = () => {
    addFormRef.value.validate(async (valid) => {
        if (valid) {
            try {
                loading.value = true;
                let primary = { ...formData };
                primary.shareholderProfitPercent = toDecimal(primary.shareholderProfitPercent);
                // primary.agentProfitPercent = toDecimal(primary.agentProfitPercent);
                await addShareholder(primary);
                ElMessage.success('新增股东成功');
                emit('refresh');
                show.value = false;
            } catch (error) {
                // console.error("新增股东失败:", error);
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