<template>
    <div class="page_header">
        <div class="page_wrapper dfcsb">
            <!-- <img class="logo" src="@/assets/logo.png" alt="" srcset=""> -->
            <div class="title">{{ state.title }}</div>
            <div class="dfc">
                <img class="avatar_icon" src="@/assets/avatar.gif" alt="" srcset="">
                <div class="ml20">
                    <div class="fw6 c000">{{ state.userInfo.nickname }}</div>
                    <el-dropdown @command="logOut">
                        <div class="dfc cursor el-dropdown-link">
                            <div class="f12 c2f207">{{ state.userInfo.roleDesc }}</div>
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>
                                    <div class="dfc">
                                        <svg-icon name="logout"></svg-icon>
                                        <div class="ml10">退出登录</div>
                                    </div>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import Router from "@/router/index";
import { localGet } from "@/utils/local.js";

const state = reactive({
    title: "",
    userInfo: {}
});

onMounted(() => {
    state.userInfo = localGet('userInfo') || {};
    switch (localGet('userInfo').role) {
        case "big":
            state.title = '大股东管理后台';
            break;
        case "shareholder":
            state.title = '股东管理后台';
            break;
        case "agent":
            state.title = '代理管理后台';
            break;
        default:
            state.title = '管理后台';
    }

})


//// 退出登录
const logOut = async () => {
    localStorage.removeItem('userInfo');
    Router.replace({ path: "/login" });
}
</script>

<style lang="scss" scoped>
.page_header {
    position: relative;
    width: 90vw;
    margin: 0 auto;
    border-radius: 15px 15px 0 0;
    background-color: #fff;
    z-index: 8;

    .page_wrapper {
        padding: 22px 30px;
        box-sizing: border-box;

        .logo {
            height: 36px;
            aspect-ratio: 4.15/1;
        }

        .title {
            font-weight: 600;
            font-size: 24px;
            background: linear-gradient(90deg, #538CF3 0%, #5B67F1 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }

        .avatar_icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
}
</style>