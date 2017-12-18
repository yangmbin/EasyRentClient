// import a from './components/a.vue'
// import b from './components/b.vue'
const login = resolve => require(['./components/login.vue'], resolve)
const index = resolve => require(['./components/index.vue'], resolve)
const houseList = resolve => require(['./components/houseList.vue'], resolve)
const addHouse = resolve => require(['./components/addHouse.vue'], resolve)
const bannerList = resolve => require(['./components/bannerList.vue'], resolve)
const addBanner = resolve => require(['./components/addBanner.vue'], resolve)
const recommendList = resolve => require(['./components/recommendList.vue'], resolve)
const addRecommend = resolve => require(['./components/addRecommend.vue'], resolve)
const contact = resolve => require(['./components/contact.vue'], resolve)

export default [
    { path: '/login', component: login },
    {
        path: '/index', component: index,
        children: [
            { path: 'houseList', component: houseList },
            { path: 'addHouse', component: addHouse },
            { path: 'bannerList', component: bannerList },
            { path: 'addBanner', component: addBanner },
            { path: 'recommendList', component: recommendList },
            { path: 'addRecommend', component: addRecommend },
            { path: 'contact', component: contact }
        ]
    }
]