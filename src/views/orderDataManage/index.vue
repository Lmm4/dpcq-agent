<template>
    <el-card class="mt20">
        <el-tabs v-model="state.activeName">
            <el-tab-pane label="亚星" :name="0" />
            <el-tab-pane label="DB真人" :name="1" />
            <!-- <el-tab-pane label="DB体育" :name="2" /> -->
            <el-tab-pane label="FG" :name="3" />
            <el-tab-pane label="9G" :name="4" />
            <el-tab-pane label="WM" :name="5" />
        </el-tabs>
        <astarGame v-if="state.activeName === 0" />
        <dbPeopleGame v-else-if="state.activeName === 1" />
        <dbSportsGame v-else-if="state.activeName === 2" />
        <fgGame v-else-if="state.activeName === 3" />
        <g9Game v-else-if="state.activeName === 4" />
        <wmGame v-else-if="state.activeName === 5" />
    </el-card>
</template>

<script setup>
import { reactive } from "vue";
import fgGame from './fgGame.vue';
import g9Game from './g9Game.vue';
import dbPeopleGame from './dbPeopleGame.vue';
import dbSportsGame from './dbSportsGame.vue';
import astarGame from './astarGame.vue';
import wmGame from './wmGame.vue';

const state = reactive({
    activeName: 0
})


</script>

<style lang="scss" scoped></style>