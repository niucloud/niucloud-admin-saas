import { getCaptcha } from '@/api/system'
import { ref } from 'vue'

interface formData {
    captcha_code: string,
    captcha_key: string
}

export function useCaptcha(formData: formData) {
    const image = ref('')
    
    const refresh = async ()=> {
        try {
            const res:AnyObject = await getCaptcha()
            if (res.code == 200) {
                formData.captcha_key = res.data.captcha_key
                formData.captcha_code = ''
                image.value = res.data.img.replace(/\r\n/g, '')
            }
        } catch (e) {
        }
    }
    
    return {
        image,
        refresh
    }
}