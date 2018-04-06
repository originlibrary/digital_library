<template>
    <div class="home-wrap">
        <Sider class="side-wrap">
            <Menu active-name="Hello" theme="dark" width="auto" @on-select="handleSelect">
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
                <MenuItem name="User">
                    <Icon type="ios-people" class="sider-icon"></Icon>
                    用户管理
                </MenuItem>
                <!--<Submenu name="1">-->
                    <!--<template slot="title">-->
                        <!--<Icon type="ios-navigate"></Icon>-->
                        <!--Item 1-->
                    <!--</template>-->
                    <!--<MenuItem name="1-1">Option 1</MenuItem>-->
                    <!--<MenuItem name="1-2">Option 2</MenuItem>-->
                    <!--<MenuItem name="1-3">Option 3</MenuItem>-->
                <!--</Submenu>-->
            </Menu>
        </Sider>
        <Layout class="main-wrap">
            <Header class="header">
                <Breadcrumb>
                    <BreadcrumbItem v-for="route in routerList" :to="route.path" :key="route.name">{{route.label}}</BreadcrumbItem>
                </Breadcrumb>
            </Header>
            <Content class="main-body">
                <Card class="main-card">
                    <router-view/>
                </Card>
            </Content>
        </Layout>
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
        },
        computed: {
            routerList() {
                return this.$route.matched.map(route => {
                    return {
                        name: route.name,
                        path: route.path,
                        label: route.meta.label
                    }
                })
            }
        },
        created() {
            this.$store.dispatch('SetUserInfo', {
                id: 1,
                name: 'name',
                role: 1
            })
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    .home-wrap {
        $sideWidth: 12.5rem;
        $headerHeight: 4rem;
        background-color: #ffffff;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        display: flex;

        .side-wrap {
            flex: none;
            width: 12.5rem;
            height: 100%;
            overflow: auto;
        }
        .sider-icon {
            width: 1rem;
        }
        .main-wrap {
            width: calc(100% - #{$sideWidth});
            height: 100%;

            .header {
                background-color: #fff;
                box-shadow: 0 2px 3px 2px rgba(0,0,0,.1);
            }

            .main-body {
                padding: 1rem;
                display: flex;
            }
            .main-card {
                flex: auto;
            }
        }
    }
</style>
