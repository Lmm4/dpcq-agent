<template>
	<div class="errPage-404">
		<div class="backgroundImg">
			<div>
				<img src="@/assets/web_404.png" />
			</div>
			<div>
				<span class="title">一不小心，页面丢失了......</span><br />
				<el-button class="button" icon="Home-filled" @click="back">返回</el-button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
import { roleRoutesMap } from "@/router/roleRoutes.js";
const back = () => {
	const role = localStorage.getItem("role")
	const firstRoute = roleRoutesMap[role]?.[0];

	if (firstRoute) {
		router.push({ path: `/${firstRoute.path}` })
	} else {
		// 如果没有角色或路由，回登录
		router.push({ path: "/login" })
	}
} 
</script>

<style lang="scss" scoped>
.errPage-404 {
	width: 100%;
	height: 100%;

	.backgroundImg {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding-top: 50px;
		text-align: center;

		.title {
			color: rgb(86, 86, 86);
			font-size: 24px;
			margin-right: 20px;
		}

		.button {
			margin-top: 20px;
		}

		img {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
