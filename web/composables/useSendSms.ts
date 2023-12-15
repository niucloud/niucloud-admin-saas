import { sendSms } from '@/api/system'

export function useSendSms() {
    const canGetCode = ref(true),
        text = ref(t('getSmsCode')),
        seconds = ref(90);

    let timer: number | undefined = undefined;

    const send = async (param: requestMobileParam) => {
        if (!canGetCode.value) return
        canGetCode.value = false

        let result: string | boolean = false
        await sendSms(param).then((res: responseResult) => {
            if (res.code == 1) {
                start()
                result = res.data.key
            } else {
                reset()
                result = false
            }
        }).catch(() => {
            result = false
            reset()
        })
        return result
    }

    /**
     * 开始
     */
    const start = () => {
        timer = setInterval(() => {
            if (seconds.value > 0) {
                seconds.value -= 1
                text.value = `${seconds.value}${t('smsCodeChangeText')}`
            } else {
                reset()
            }
        }, 1000)
    }

    /**
     * 重置
     */
    const reset = () => {
        clearInterval(timer)
        seconds.value = 90
        canGetCode.value = true
        text.value = t('getSmsCode')
    }

    return {
        send,
        text,
        canGetCode
    }
}