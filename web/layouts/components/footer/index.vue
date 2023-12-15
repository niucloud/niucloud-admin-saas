<template>
    <div class="flex h-[220px] min-w-[1200px] bg-[#3F4045]">
		<div class="mt-[70px] w-full">
            <p class="text-center text-[#999]">
				<span>友情链接：</span>
				<NuxtLink to="https://www.bt.cn">
				    <span class="mr-[10px]">宝塔</span>|
				</NuxtLink>
				<NuxtLink to="https://www.oschina.net">
				    <span class="mr-[10px]">开源中国</span>|
				</NuxtLink>
				<NuxtLink to="https://www.aliyun.com">
				    <span class="mr-[10px]">阿里云</span>|
				</NuxtLink>
				<NuxtLink to="https://gitee.com/">
				    <span class="mr-[10px]">码云Gitee</span>|
				</NuxtLink>
				<NuxtLink to="https://cloud.tencent.com/">
				    <span class="mr-[10px]">腾讯云</span>|
				</NuxtLink>
				<NuxtLink to="https://mp.weixin.qq.com">
				    <span class="mr-[10px]">微信公众平台</span>|
				</NuxtLink>
				<NuxtLink to="http://www.thinkphp.cn">
				    <span class="mr-[10px]">Thinkphp</span>
				</NuxtLink>
			</p>
            <p class="text-center mt-[20px] text-[#999]">
				<NuxtLink to="https://beian.miit.gov.cn/">
					<span>备案号:{{ copy }}</span>
				</NuxtLink>
			</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getCopyRight } from '@/api/system';	
import { reactive, ref } from 'vue'

const copy = ref();
const getCopy = () => {
    getCopyRight({
    }).then(res => {
		copy.value = res.data.icp
    })
}
getCopy()
</script>

<style lang="scss" scoped>

</style>