<template>
    <div class="error404">
        <error code="403" :title="t('tips')" :show-btn="false">
            <template #content>
                <div class="flex justify-center">
                    <img class="w-[150px] h-[150px]" src="@/assets/images/no_perms.png" alt="" />
                </div>
            </template>
        </error>
    </div>
</template>

<script lang="ts" setup>
import error from './components/error.vue'
import { t } from '@/lang'
</script>
