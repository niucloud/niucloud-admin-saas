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
            <p class="text-center mt-[20px] text-[#999]" v-if="copyright">
                <NuxtLink :to="copyright.gov_url" v-if="copyright.gov_record">
                    <span class="mr-2">公安备案号:{{ copyright.gov_record }}</span>
                </NuxtLink>
				<NuxtLink to="https://beian.miit.gov.cn/" v-if="copyright.icp">
					<span class="mr-2">备案号:{{ copyright.icp }}</span>
				</NuxtLink>
                <NuxtLink :to="copyright.copyright_link">
                    <span class="mr-2" v-if="copyright.company_name">{{ copyright.company_name }}</span>
                    <span class="mr-2" v-if="copyright.copyright_desc">©{{ copyright.copyright_desc }}</span>
                </NuxtLink>
			</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getCopyRight } from '@/app/api/system';
import { reactive, ref } from 'vue'

const copyright = ref(null);
const getCopy = () => {
    getCopyRight().then(({ data }) => {
        copyright.value = data
    })
}
getCopy()
</script>

<style lang="scss" scoped>

</style>
