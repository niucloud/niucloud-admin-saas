export default [
    {
        path: "/",
        component: () => import('~/app/pages/index.vue')
    },
    {
        path: "/auth/login",
        component: () => import('~/app/pages/auth/login.vue'),
        meta: {
            layout: "container"
        }
    },
    {
        path: "/auth/register",
        component: () => import('~/app/pages/auth/register.vue'),
        meta: {
            layout: "container"
        }
    },
    {
        path: "/auth/bind",
        component: () => import('~/app/pages/auth/bind.vue'),
        meta: {
            layout: "container"
        }
    },
    {
        path: "/auth/agreement",
        component: () => import('~/app/pages/auth/agreement.vue')
    },
    {
        path: "/member",
        component: () => import('~/app/pages/member/index.vue'),
        meta: {
            middleware: ["auth"]
        }
    },
    {
        path: "/member/center",
        component: () => import('~/app/pages/member/center.vue'),
        meta: {
            middleware: ["auth"]
        }
    },
    {
        path: "/member/balance",
        component: () => import('~/app/pages/member/balance.vue'),
        meta: {
            middleware: ["auth"]
        }
    },
    {
        path: "/member/point",
        component: () => import('~/app/pages/member/point.vue'),
        meta: {
            middleware: ["auth"]
        }
    },
    {
        path: "/site/close",
        component: () => import('~/app/pages/site/close.vue'),
        meta: {
            layout: "container"
        }
    },
    {
        path: "/site/nosite",
        component: () => import('~/app/pages/site/nosite.vue'),
        meta: {
            layout: "container"
        }
    }
]
