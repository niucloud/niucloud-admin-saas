<template>
	<div class="main-container attachment-container">
		<el-card class="box-card !border-none full-container" shadow="never">
			<el-tabs v-model="type" class="">
				<el-tab-pane :label="t(tab)" v-for="(tab, index) in attachmentType" :name="tab" :key="index">
					<attachment scene="attachment" :type="tab" />
				</el-tab-pane>
			</el-tabs>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { t } from '@/lang'
import attachment from '@/components/upload-attachment/attachment.vue'

const attachmentType: string[] = ['image', 'video', 'icon']
const type = ref(attachmentType[0])

</script>

<style lang="scss" scoped></style>
<style lang="scss">
	.attachment-container {
		.el-card__body {
			height: 100%;
		}

		.el-tabs {
			display: flex;
			flex-direction: column;
			height: 100%;
		}

		.el-tabs__content {
			flex: 1;

			.el-tab-pane {
				height: 100%;
			}
		}

		.el-tabs__nav-wrap::after {
			height: 1px;
		}

		.main-wrap {
			border: none;

			.group-wrap {
				padding: 0 15px 0 0;
			}

			.attachment-list-wrap {
				padding: 0 0 0 15px;
			}
		}
	}
</style>
