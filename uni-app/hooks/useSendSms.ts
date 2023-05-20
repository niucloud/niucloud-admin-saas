import { ref, computed } from 'vue'
import { t } from '@/locale'
import { sendSms } from '@/api/system'

export function useSendSms(smsRef: AnyObject | null) {
    const tips = ref(t('getSmsCode'))
    const seconds = 90
    const changeText = 'X' + t('smsCodeChangeText') 
    
    const canGetCode = computed(() =>{
        return smsRef.value ? smsRef.value.canGetCode : true
    })
    
    /**
     * 发送短信
     */
    const send = async (param:requestMobileParam) => {
        if (!canGetCode.value) return
        
        smsRef.value.start()
        
        let result: string | boolean = false
        await sendSms(param).then(res=>{
            if (res.code == 1) {
                result = res.data.key
            } else {
                smsRef.value.reset()
                result = false
            }
        }).catch(err=>{
            result = false
            smsRef.value.reset()
        })
        return result
    }
    
    const codeChange = (text: string)=>{
        tips.value = text
    }
    
    return {
        tips: tips,
        seconds,
        canGetCode: canGetCode,
        send,
        codeChange,
        changeText
    }
}