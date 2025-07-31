<template>
    <div class="index">
        <pageHeader />
        <div class="router_view">
            <div class="page_body">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup>
import pageHeader from './pageHeader.vue';
</script>

<style lang="scss" scoped>
.index {
    width: 100%;
    height: 100%;
    position: relative;
    padding-top: 50px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 8px;
        /*高宽分别对应横竖滚动条的尺寸*/
        height: 8px;
    }

    &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #e1e2e5;
    }

    &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #ffffff;
    }

    &::after {
        position: absolute;
        content: "";
        left: 0;
        top: 0;
        width: 100%;
        height: 300px;
        background-image: linear-gradient(103.75deg, #33b1ee -13.9%, #7366ff 79.68%);
    }

    .router_view {
        width: 100%;
        background-image: url("@/assets/boxbg.jpg");
        background-blend-mode: overlay;
        background-color: hsla(0, 0%, 100%, .5);
        flex: 1;

        .page_body {
            position: relative;
            z-index: 8;
            margin: 0 auto;
            width: 90vw;
            background-color: #f8f8f8;
            border-radius: 0 0 15px 15px;
            height: 100%;
            padding: 20px;
            box-sizing: border-box;
        }
    }

}
</style>