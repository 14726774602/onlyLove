import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Home',
        component: Home,
        children: [{ //首页
            path: '/',
            name: 'index',
            component: () =>
                import ('@/components/front/index')
        }, { //首页
            path: '/index',
            name: 'index',
            component: () =>
                import ('@/components/front/index')
        }, { //生活
            path: '/life',
            name: 'life',
            component: () =>
                import ('@/components/front/life')
        }, { //相册
            path: '/photo',
            name: 'photo',
            component: () =>
                import ('@/components/front/photo')
        }, { //it技术分享
            path: '/it',
            name: 'it',
            component: () =>
                import ('@/components/front/it')
        }, { //关于我
            path: '/my',
            name: 'my',
            component: () =>
                import ('@/components/front/my')
        }, { //搜索
            path: '/search',
            name: 'search',
            component: () =>
                import ('@/components/front/search')
        }, { //生活文章内页
            path: '/life_page',
            name: 'life_page',
            component: () =>
                import ('@/components/front/life_page')
        }, { //生活文章内页
            path: '/photo_page',
            name: 'photo_page',
            component: () =>
                import ('@/components/front/photo_page')
        }, { //it文章内页
            path: '/it_page',
            name: 'it_page',
            component: () =>
                import ('@/components/front/it_page'),
            children: [{ //模板
                path: '/it_page/Template',
                name: 'Template',
                // 页面在进入此组件时才加载此组件
                component: () =>
                    import ('@/components/it/Template')
            }, {
                path: '/it_page/it25',
                name: 'it25',
                // 页面在进入此组件时才加载此组件
                component: () =>
                    import ('@/components/it/it25')
            }, {
                path: '/it_page/it26',
                name: 'it26',
                // 页面在进入此组件时才加载此组件
                component: () =>
                    import ('@/components/it/it26')
            }, {
                path: '/it_page/it27',
                name: 'it27',
                // 页面在进入此组件时才加载此组件
                component: () =>
                    import ('@/components/it/it27')
            }, {
                path: '/it_page/it28',
                name: 'it28',
                // 页面在进入此组件时才加载此组件
                component: () =>
                    import ('@/components/it/it28')
            }, {
                path: '/it_page/it29',
                name: 'it29',
                // 页面在进入此组件时才加载此组件
                component: () =>
                    import ('@/components/it/it29')
            }, {
                path: '/it_page/it30',
                name: 'it30',
                // 页面在进入此组件时才加载此组件
                component: () =>
                    import ('@/components/it/it30')
            }, {
                path: '/it_page/it31',
                name: 'it31',
                // 页面在进入此组件时才加载此组件
                component: () =>
                    import ('@/components/it/it31')
            }, {
                path: '/it_page/it32',
                name: 'it32',
                // 页面在进入此组件时才加载此组件
                component: () =>
                    import ('@/components/it/it32')
            }, {
                path: '/it_page/it33',
                name: 'it33',
                // 页面在进入此组件时才加载此组件
                component: () =>
                    import ('@/components/it/it33')
            }, {
                path: '/it_page/it34',
                name: 'it34',
                // 页面在进入此组件时才加载此组件
                component: () =>
                    import ('@/components/it/it34')
            }, {
                path: '/it_page/it35',
                name: 'it35',
                // 页面在进入此组件时才加载此组件
                component: () =>
                    import ('@/components/it/it35')
            }, {
                path: '/it_page/it36',
                name: 'it36',
                // 页面在进入此组件时才加载此组件
                component: () =>
                    import ('@/components/it/it36')
            }]
        }]
    }, {
        path: '/Login',
        name: 'Login',
        // 页面在进入此组件时才加载此组件
        component: () =>
            import ('@/components/Login')
    }, { //个人信息页
        path: '/Intro',
        name: 'Intro',
        component: () =>
            import ('@/components/front/intro')
    }, {
        path: '/Template',
        name: 'Template',
        // 页面在进入此组件时才加载此组件
        component: () =>
            import ('@/components/Template')
    }]
})