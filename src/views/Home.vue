<template>
    <HomeCanvas>
        <div class="home-wrap">
            <div class="header">
                <div class="header-title">
                    <span class="title">SXY的个人图书馆</span>
                    <span class="remark">v1.0</span>
                </div>
                <div class="login-tool">
                    <span class="tool-text">{{$store.getters.name}}</span>
                    <div @click="exit" class="tool-button">
                        <Icon type="power" class="tool-icon"></Icon>
                        <span class="tool-text">退出登录</span>
                    </div>
                </div>
            </div>
            <div class="content">
                <SiderBar class="slider"/>
                <div class="main">
                    <router-view/>
                </div>
            </div>
            <!--<Sider class="side-wrap">
                <Menu :active-name="$route.name" theme="dark" width="auto" @on-select="handleSelect">
                    <MenuItem name="Hello">
                        <Icon type="navicon-round" class="sider-icon"></Icon>
                        首页
                    </MenuItem>
                    <MenuItem name="Book">
                        <Icon type="ios-book" class="sider-icon"></Icon>
                        图书
                    </MenuItem>
                    <MenuItem name="Download">
                        <Icon type="ios-timer-outline" class="sider-icon"></Icon>
                        下载
                    </MenuItem>
                    <MenuItem name="User" v-if="$store.getters.role === '1'">
                        <Icon type="ios-people" class="sider-icon"></Icon>
                        用户管理
                    </MenuItem>
                    &lt;!&ndash;<Submenu name="1">&ndash;&gt;
                        &lt;!&ndash;<template slot="title">&ndash;&gt;
                            &lt;!&ndash;<Icon type="ios-navigate"></Icon>&ndash;&gt;
                            &lt;!&ndash;Item 1&ndash;&gt;
                        &lt;!&ndash;</template>&ndash;&gt;
                        &lt;!&ndash;<MenuItem name="1-1">Option 1</MenuItem>&ndash;&gt;
                        &lt;!&ndash;<MenuItem name="1-2">Option 2</MenuItem>&ndash;&gt;
                        &lt;!&ndash;<MenuItem name="1-3">Option 3</MenuItem>&ndash;&gt;
                    &lt;!&ndash;</Submenu>&ndash;&gt;
                </Menu>
            </Sider>
            <Layout class="main-wrap">
                <Header class="header">
                    <Breadcrumb>
                        <BreadcrumbItem v-for="route in routerList" :to="route.path" :key="route.name">{{route.label}}</BreadcrumbItem>
                    </Breadcrumb>
                    <div>
                        <span>{{$store.getters.name}}</span>
                        <Button type="text" @click="exit">
                            <Icon type="power" style="margin-right: 0.5rem;"></Icon>
                            <span>退出登录</span>
                        </Button>
                    </div>
                </Header>
                <Content class="main-body">
                    <Card class="main-card">
                        <router-view/>
                    </Card>
                </Content>
            </Layout>-->
        </div>
    </HomeCanvas>
</template>

<script>
    import SiderBar from '../components/slider'
    import HomeCanvas from '../components/HomeCanvas'

    export default {
        components: {
            SiderBar,
            HomeCanvas
        },
        methods: {
            exit() {
                this.$store.dispatch('logout').then(() => {
                    this.$router.push('/login')
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .home-wrap {
        $sideWidth: 12.5rem;
        $headerHeight: 5rem;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;

        .header {
            width: 100%;
            height: $headerHeight;
            display: flex;
            justify-content: space-between;
            padding: 0 1.5rem;
            z-index: 2;
        }
        .header-title {
            color: #fff;
            line-height: $headerHeight;

            .title {
                font-size: 2rem;
            }
            .remark {
                font-size: 1rem;
                margin-left: 1.5rem;
            }
        }
        .content {
            width: 100%;
            height: calc(100% - #{$headerHeight});
            display: flex;
            padding: 1rem 0;
            z-index: 2;
        }
        .slider {
            width: $sideWidth;
            height: 100%;
        }
        .main {
            width: calc(100% - #{$sideWidth});
            height: 100%;
            overflow: auto;
            padding: 1rem;
        }
        .login-tool {
            line-height: $headerHeight;
            color: #fff;
            display: flex;
            font-size: 1rem;

            .tool-icon {
                color: #fff;
                transition: color .1s;
                margin-right: 0.3rem;
            }
            .tool-text {
                transition: color .3s;
                color: #fff;
            }
            .tool-button {
                padding: 0 1rem;
                cursor: pointer;

                &:hover  {
                    .tool-text, .tool-icon {
                        color: aqua;
                    }
                }
            }
        }
    }
</style>
