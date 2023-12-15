import { getCaptcha } from '@/api/system'

interface formData {
    captcha_code: string,
    captcha_key: string
}

export function useCaptcha(formData: formData) {
    const image = ref('')

    const refresh = async () => {
        try {
            await getCaptcha().then((res: any) => {
                if (res.code == 1) {
                    formData.captcha_key = res.data.captcha_key
                    formData.captcha_code = ''
                    image.value = res.data.img.replace(/\r\n/g, '')
                }
            })
        } catch (e) {
        }
    }

    return {
        image,
        refresh
    }
}