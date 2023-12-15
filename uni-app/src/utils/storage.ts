import { getSiteId } from './common'

const handleKey = (key: string) : string => {
    const siteid = getSiteId(0)
    const storageKey = (siteid ? `site${siteid}.` : '') + key
    return storageKey
}

export function uniStorage(){
    const setStorageSync = uni.setStorageSync
    const setStorage = uni.setStorage
    const getStorage = uni.getStorage
    const getStorageSync = uni.getStorageSync
    const removeStorage = uni.removeStorage
    const removeStorageSync = uni.removeStorageSync
    
    uni.setStorage = (options: UniNamespace.SetStorageOptions)=> {
        options.key = handleKey(options.key)
        setStorage(options)
    }
    
    uni.setStorageSync = (key: string, data: any) => {
        setStorageSync(handleKey(key), data)
    }
    
    uni.getStorage = (options: UniNamespace.GetStorageOptions) => {
        options.key = handleKey(options.key)
        getStorage(options)
    }
    
    uni.getStorageSync = (key: string) => {
        return getStorageSync(handleKey(key))
    }
    
    uni.removeStorage = (options: UniNamespace.RemoveStorageOptions) => {
        options.key = handleKey(options.key)
        removeStorage(options)
    }
    
    uni.removeStorageSync = (key: string) => {
        return removeStorageSync(handleKey(key))
    }
}