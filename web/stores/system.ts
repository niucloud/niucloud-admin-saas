import { defineStore } from 'pinia'
import storage from '@/utils/storage'

interface System {
    lang: string
}

const useSystemStore = defineStore('system', {
    state: (): System => {
        return {
            lang: storage.get('lang') ?? 'zh-cn'
        }
    }
})

export default useSystemStore