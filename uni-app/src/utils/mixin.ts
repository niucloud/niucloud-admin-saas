import { currRoute } from './common'
import { redirectInterceptor } from './interceptor'

export default {
    install(vue) {
        vue.mixin({
            data() {
                return {
                    query: {}
                }
            },
            onLoad: (data: object) => {
                this.query = data
            },
            onShow: () => {
                const route = currRoute() ?? ''

                redirectInterceptor({
                    path: route,
                    query: this.query
                })
            }
        });
    },
};
