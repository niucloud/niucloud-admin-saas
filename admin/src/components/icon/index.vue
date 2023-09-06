<template>
	<el-icon v-if="type=='element'" :style="style" :class="['icon el-icon',props.class]">
		<component :is="name"/>
	</el-icon>
	<i v-else :class="[type,name,props.class]" :style="style"></i>
</template>
<script lang="ts" setup>
    import {watch, ref, reactive} from 'vue'

    const props = defineProps({
        name: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: 'var(--color)'
        },
        class: {
            type: [String, Object],
            default: ''
        },
        size: {
            type: String,
            default: '16px'
        },
    })

    const type = ref('');
    const name = ref('');

    const style = reactive({
        color: props.color,
        fontSize: props.size
    });

    const load = () => {
        let arr = props.name.split(/-(.*)/);
        type.value = arr[0];
        name.value = arr[1];
    };

    load();

    watch(() => props.name, () => {
        load();
    })
</script>
