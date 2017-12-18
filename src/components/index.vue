<style scoped>
.layout {
    border: 0px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
}

.layout-breadcrumb {
    padding: 10px 15px 0;
}

.layout-content {
    min-height: 80vh;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
}

.layout-content-main {
    padding: 10px;
}

.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}

.layout-menu-left {
    background: #464c5b;
    min-height: 100vh;
}

.layout-header {
    width: 100%;
    height: 60px;
    padding-right: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    display: table;
}

.layout-header-content {
    display: table-cell;
    vertical-align: middle;
    text-align: right;
}

.layout-header-dropdown-menu {
    text-align: center;
}

.layout-logo-left {
    width: 90%;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 5px;
}

.layout-logo-left span {
    color: #fff;
    font-size: 22px;
}
</style>
<template>
    <div class="layout">
        <Row type="flex">
            <Col span="5" class="layout-menu-left">
            <Menu @on-select="changeMenu" ref="side_menu" :active-name="indexActiveName" theme="dark" width="auto" :open-names="indexOpenName">
                <div class="layout-logo-left">
                    <span>享寓青年</span>
                </div>
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        公寓信息
                    </template>
                    <router-link to="/index/houseList">
                        <MenuItem name="1-1">公寓列表</MenuItem>
                    </router-link>
                    <router-link to="/index/addHouse">
                        <MenuItem name="1-2">添加公寓</MenuItem>
                    </router-link>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        Banner
                    </template>
                    <router-link to="/index/bannerList">
                        <MenuItem name="2-1">Banner列表</MenuItem>
                    </router-link>
                    <router-link to="/index/addBanner">
                        <MenuItem name="2-2">Banner添加</MenuItem>
                    </router-link>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-analytics"></Icon>
                        公寓推荐
                    </template>
                    <router-link to="/index/recommendList">
                        <MenuItem name="3-1">推荐列表</MenuItem>
                    </router-link>
                    <router-link to="/index/addRecommend">
                        <MenuItem name="3-2">添加推荐</MenuItem>
                    </router-link>
                </Submenu>
                <Submenu name="4">
                    <template slot="title">
                        <Icon type="android-settings"></Icon>
                        设置
                    </template>
                    <router-link to="/index/contact">
                        <MenuItem name="4-1">联系方式</MenuItem>
                    </router-link>
                </Submenu>
            </Menu>
            </Col>
            <Col span="19">
            <div class="layout-header">
                <div class="layout-header-content">
                    <dropdown>
                        <a href="javascript:void(0);">
                            <Avatar style="color: #f56a00;background-color: #fde3cf">U</Avatar>
                            &nbsp;&nbsp;Admin
                        </a>
                        <dropdown-menu slot="list" class="layout-header-dropdown-menu">
                            <dropdown-item>退出</dropdown-item>
                        </dropdown-menu>
                    </dropdown>
                </div>
            </div>
            <div class="layout-breadcrumb">
                <!-- <Breadcrumb>
                    <BreadcrumbItem href="#">Home</BreadcrumbItem>
                    <BreadcrumbItem href="#">Projects</BreadcrumbItem>
                    <BreadcrumbItem>iView</BreadcrumbItem>
                </Breadcrumb> -->
            </div>
            <div class="layout-content">
                <div class="layout-content-main">
                    <router-view></router-view>
                </div>
                <!-- <router-link to="/a">Go to a</router-link>
                    <router-link to="/b">Go to b</router-link> -->
            </div>
            <div class="layout-copy">
                2017-2018 &copy; 享寓青年
            </div>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            indexActiveName: "1-1",
            indexOpenName: ["1"]
        };
    },
    // 在组件初始化时调用，可以简单理解为页面加载时
    created() {
        // 存在 localStorage 的缓存内容
        if (localStorage.indexActiveName) {
            this.indexActiveName = localStorage.getItem("indexActiveName");
        }
        if (localStorage.indexOpenName) {
            this.indexOpenName = JSON.parse(
                localStorage.getItem("indexOpenName")
            );
        }
    },
    watch: {
        $route() {
            
        },
        indexActiveName(val, oldval) {
            localStorage.setItem("indexActiveName", this.indexActiveName);
        },
        indexOpenName(val, oldval) {
            localStorage.setItem(
                "indexOpenName",
                JSON.stringify(this.indexOpenName)
            );

            console.log(this.indexActiveName);
        }
    },
    methods: {
        // 手动更新当前选择项，因为active-name不能动态绑定
        changeMenu(name) {
            this.indexActiveName = name;
        }
    }
};
</script>
