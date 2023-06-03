<template>
    <div class="error">
        <div class="flex items-center">
            <slot name="content">
				<div>
					<img class="w-[300px]" src="@/assets/images/error.png"/>
				</div>
            </slot>
			<div class="text-left ml-[100px]">
				<div class="error-text text-[28px] font-bold">404错误！</div>
				<div class="text-[#222] text-[20px] mt-[15px]">哎呀，出错了！您访问的页面不存在...</div>
				<div class="text-[#c4c2c2] text-[12px] mt-[5px]">尝试检查URL的错误，然后点击浏览器刷新按钮。</div>
				<div class="mt-[40px]">
				    <el-button class="bottom" @click="router.go(-1)">{{ second }} 秒后返回上一页</el-button>
				</div>
			</div>
            
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

let timer: any = null
const second = ref(5)
const router = useRouter()

timer = setInterval(() => {
    if (second.value === 0) {
        clearInterval(timer)
        router.go(-1)
    } else {
        second.value--
    }
}, 1000)

onUnmounted(() => {
    timer && clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.error {
    text-align: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .error-code {
        @apply text-primary;
        font-size: 150px;
    }
	.error-text {
		color:#0e77fd;
	}
    .el-button {
        width: 176px;
		background-color: #0e77fd;
		color:#fff
    }
}
</style>
