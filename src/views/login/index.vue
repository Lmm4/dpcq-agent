<template>
    <div class="index dfcc">
        <div class="login_card">
            <div class="dfcc mb30">
                <img class="logo" src="@/assets/logo.png" alt="" srcset="">
            </div>
            <div class="login_box">
                <div class="f24 fw5 c2f2 mb5">登录账户</div>
                <div class="f14 c898 mb25">输入您的邮箱和密码即可登录</div>
                <el-form label-position="top" label-width="auto" :model="loginForm" :rules="rules" ref="loginFormRef"
                    hide-required-asterisk>
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input show-password v-model="loginForm.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-model="state.rememberPwd" label="记住密码" />
                    </el-form-item>
                </el-form>
                <el-button type="primary" class="login_btn" @click="loginBtn">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, useTemplateRef, computed } from 'vue';
import { ElMessage } from "element-plus";
import Router from "@/router/index";
import { useRoute } from 'vue-router';
import { localGet, localRemove, localSet } from "@/utils/local.js";
import { setupRoleRoutes } from '@/router/roleRoutes';
import { login } from '@/api/page/login.js';
const route = useRoute();

const loginFormRef = ref(null);

const state = reactive({
    rememberPwd: false
})
const loginForm = reactive({
    username: "",
    password: "",
    verifyCode: "abcd",
})

const rules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
})

// 登录
const loginBtn = () => {
    loginFormRef.value.validate(async (valid) => {
        if (valid) {
            const res = await login(loginForm);
            localSet('userInfo', res);
            localSet('username', loginForm.username);
            if (state.rememberPwd) {
                localSet('password', loginForm.password);
                localSet('checked', true);
            } else {
                localRemove('password');
                localRemove('checked');
            }
            await setupRoleRoutes(res.role);
            if (res.role === "big") {
                await Router.replace({ path: "/equityList" });
            } else if (res.role === "shareholder") {
                await Router.replace({ path: "/proxyList" });
            } else if (res.role === "agent") {
                await Router.replace({ path: "/vipList" });
            }
            ElMessage.success("登录成功");
        } else {
            ElMessage.error("请填写完整信息");
            return false;
        }
    });
}


onMounted(() => {
    if (route.query.redirect) {
        Router.replace({ path: '/login' }) // 清理掉 redirect 参数
    }
    if (localGet('checked')) {
        state.rememberPwd = true;
        loginForm.password = localGet('password') || '';
    }
    loginForm.username = localGet('username') || '';

})
</script>

<style lang="scss" scoped>
.index {
    width: 100%;
    height: 100%;
    background-image: url("@/assets/login_bg.jpg");
    background-size: 100% 100%;

    .login_card {
        width: 450px;

        .logo {
            height: 36px;
            aspect-ratio: 4.15/1;
        }

        .login_box {
            width: 100%;
            background-color: #fff;
            border-radius: 10px;
            padding: 40px;
            box-sizing: border-box;
            box-shadow: 0 0 37px rgba(8, 21, 66, .05);

            .login_btn {
                width: 100%;
                height: 35px;
            }
        }
    }
}
</style>