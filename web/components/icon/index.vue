<script lang="ts">
import { createVNode, resolveComponent, defineComponent } from 'vue'

export default defineComponent({
    name: 'Icon',
    props: {
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
    },
    setup(props) {
        let [type, name] = props.name.split(/-(.*)/)

        let style = {
            color: props.color,
            fontSize: props.size
        }

        switch (type) {
            case 'element':
                return () => createVNode('el-icon', { class: ['icon el-icon', props.class], style: style }, [createVNode(resolveComponent(name))])
                break;
            case 'iconfont':
                return () => createVNode('i', { class: [name, 'iconfont', props.class], style: style })
                break;
        }
    }
})
</script>
