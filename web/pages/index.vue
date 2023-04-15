<template>
    <div class="w-full">
        <el-carousel height="500px" arrow="never">
            <el-carousel-item>
                <div class="h-full index-carousel"></div>
            </el-carousel-item>
        </el-carousel>
        <div class="word main-container pb-[200px] pt-[60px]">
			<div class="word-title">
				<p class="text-[40px] text-[#666] font-bold text-center mb-[20px]">Niucloud文档管理</p>
				<p class="text-[16px] text-[#666] text-center">无论是快速上手，还是深入了解NIUCLOUD，这里都是最好的地点</p>
			</div>
			<div class="flex justify-between mt-[100px]">
				<div class="w-[280px]">
					<div class="flex items-center">
						<div class="w-[30px] h-[30px] mr-[10px]"><img src="@/assets/images/word/course.jpg" /></div>
						<p class="text-[20px] text-[#666] font-bold">官方教程</p>
					</div>
					<p class="text-[14px] w-[280px] h-[100px] text-[#666666] leading-[22px] mt-[30px] mb-[20px]">
						详尽细致的逐步官方教程，帮助您系统全面的接触NIUCLOUD，建议在使用前阅读。</p>
					<NuxtLink to="https://www.kancloud.cn/cui18734824089/niucloud-admin-develop/3148343" target="_blank">
						<div
							class="flex justify-between items-center w-[280px] h-[40px] leading-[40px] rounded-[5px] border-[1px] border-[solid] border-[#508BFE]">
							<span class="block ml-[20px] text-[14px] text-[#333]">前往教程</span>
							<span class="block mr-[20px] text-[24px] text-[#333]">→</span>
						</div>
					</NuxtLink>
				</div>
				<div class="w-[280px]">
					<div class="flex items-center">
						<div class="w-[30px] h-[30px] mr-[10px]"><img src="@/assets/images/word/api.jpg" /></div>
						<p class="text-[20px] text-[#666] font-bold">API文档</p>
					</div>
					<p class="text-[14px] w-[280px] h-[100px] text-[#666666] leading-[22px] mt-[30px] mb-[20px]">
						您可以通过API文档了解niucloud的正确使用方法，也可以更加深入地理解niucloud的运行逻辑。</p>
					<NuxtLink to="https://www.niucloud.com/apidoc.html" target="_blank">
						<div
							class="flex justify-between items-center w-[280px] h-[40px] leading-[40px] rounded-[5px] border-[1px] border-[solid] border-[#508BFE]">
							<span class="block ml-[20px] text-[14px] text-[#333]">前往API文档</span>
							<span class="block mr-[20px] text-[24px] text-[#333]">→</span>
						</div>
					</NuxtLink>
				</div>
				<div class="w-[280px]">
					<div class="flex items-center">
						<div class="w-[30px] h-[30px] mr-[10px]"><img src="@/assets/images/word/community.jpg" /></div>
						<p class="text-[20px] text-[#666] font-bold">问答社区</p>
					</div>
					<p class="text-[14px] w-[280px] h-[100px] text-[#666666] leading-[22px] mt-[30px] mb-[20px]">
						便捷地浏览其它用户关于niucloud的问题，并从解答中获取niucloud的使用方法，当然您可以进行提问。</p>
					<NuxtLink>
						<div
							class="flex justify-between items-center w-[280px] h-[40px] leading-[40px] rounded-[5px] border-[1px] border-[solid] border-[#508BFE]">
							<span class="block ml-[20px] text-[14px] text-[#333]">前往问答社区</span>
							<span class="block mr-[20px] text-[24px] text-[#333]">→</span>
						</div>
					</NuxtLink>
				</div>
				<div class="w-[280px]">
					<div class="flex items-center">
						<div class="w-[30px] h-[30px] mr-[10px]"><img src="@/assets/images/word/wx.jpg"></div>
						<p class="text-[20px] text-[#666] font-bold">关注公众号</p>
					</div>
					<p class="text-[14px] w-[280px] h-[100px] text-[#666666] leading-[22px] mt-[30px] mb-[20px]">
						您可以扫描页面底部的二维码来关注我们的官方公众号，获得一手咨询及使用技巧。</p>
				</div>

			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.index-carousel {
	background-image: url('@/assets/images/index_carousel.png');
	background-position: center center;
	background-repeat: no-repeat;
	background-size: cover;
}

.word {
	background-image: url(@/assets/images/word/word-back.jpg);
	background-size: 100%;
	background-repeat: no-repeat;
}
</style>