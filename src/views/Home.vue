<template>
    <div class="home-wrap">
        <div class="header">
            <Menu mode="horizontal" theme="light" activeName="helloWorld" @on-select="handleSelect">
                <MenuItem name="helloWorld">
                    <Icon type="ios-paper"></Icon>
                    内容管理
                </MenuItem>
                <MenuItem name="111">
                    <Icon type="ios-people"></Icon>
                    用户管理
                </MenuItem>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="stats-bars"></Icon>
                        统计分析
                    </template>
                    <MenuGroup title="使用">
                        <MenuItem name="3-1">新增和启动</MenuItem>
                        <MenuItem name="3-2">活跃分析</MenuItem>
                        <MenuItem name="3-3">时段分析</MenuItem>
                    </MenuGroup>
                    <MenuGroup title="留存">
                        <MenuItem name="3-4">用户留存</MenuItem>
                        <MenuItem name="3-5">流失用户</MenuItem>
                    </MenuGroup>
                </Submenu>
                <MenuItem name="4">
                    <Icon type="settings"></Icon>
                    综合设置
                </MenuItem>
            </Menu>
        </div>
        <div class="main">
            <router-view/>
            <BackTop :height="100" :bottom="200">
                <div class="top">返回顶端</div>
            </BackTop>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            handleSelect(name) {
                this.$router.push({name: name})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .home-wrap {
        $headerHeight: 4rem;
        background-color: #ffffff;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;

        .header {
            width: 100%;
            height: $headerHeight;
        }
        .main {
            width: 100%;
            height: calc(100% - #{$headerHeight});
            overflow: auto;
        }
        .top {
            padding: 10px;
            background: rgba(0, 153, 229, .7);
            color: #fff;
            text-align: center;
            border-radius: 2px;
        }
    }
</style>
