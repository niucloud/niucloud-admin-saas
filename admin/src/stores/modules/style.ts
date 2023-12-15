import { defineStore } from 'pinia'
const useStyleStore = defineStore('style', {
    state: () => {
        return {
            flag : true
        }
    },
    actions: {
        changeStyle() {
            this. flag = false
        },
        changeBlack() {
            this. flag = true
        }
    }
})

export default useStyleStore