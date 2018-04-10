<template>
    <section class="book-manager-wrap">
        <div class="header">
            <Searchbar placeholder="按昵称搜索" @search="searchByName" class="searchTool"/>
            <Searchbar placeholder="按用户名搜索" @search="searchByAccount" class="searchTool"/>
        </div>
        <div class="main">
            <Table :width="tableWidth" :loading="loading" :row-class-name="rowClassName" :columns="columns" :data="data"></Table>
        </div>
        <!--<div class="footer"></div>-->
    </section>
</template>

<script>
    import Searchbar from '../../components/Searchbar'
    import {getUserList, setHighRole, deleteUser} from '../../api/user'

    export default {
        data() {
            return {
                columns: [
                    {
                        title: '昵称',
                        key: 'username',
                        // width: 200,
                        align: 'center'
                    },
                    {
                        title: '用户名',
                        key: 'account',
                        // width: 200,
                        align: 'center'
                    },
                    {
                        title: '下载次数',
                        key: 'downloadCount',
                        // width: 200,
                        align: 'center'
                    },
                    {
                        title: '权限',
                        key: 'role',
                        // width: 200,
                        align: 'center',
                        render: (h, params) => {
                            console.log(params)
                            let roleLabel, role = params.row.role
                            switch (role) {
                                case 1: {
                                    roleLabel = '超级管理员'
                                    break
                                }
                                case 2: {
                                    roleLabel = '管理员'
                                    break
                                }
                                case 3: {
                                    roleLabel = '游客'
                                    break
                                }
                                default: {
                                    roleLabel = '游客'
                                }
                            }
                            return (
                                <span>{roleLabel}</span>
                            )
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        // width: 300,
                        align: 'center',
                        render: (h, params) => {
                            const role = params.row.role,
                                id = params.row.id
                            return (
                                <div class="button-box">
                                    {
                                        this.role === 1 && role === 3 ? (
                                            <div class="button-item" onClick={() => {this.setHighRole(id)}}>
                                                设为管理员
                                            </div>
                                        ) : null
                                    }
                                    {
                                        this.role === 1 && role !== 1 ? (
                                            <div class="button-item" onClick={() => this.deleteUser(id)}>
                                                删除
                                            </div>
                                        ) : null
                                    }
                                </div>
                            )
                        }
                    }
                ],
                data: [],
                filter: {
                    username: '',
                    account: ''
                },
                tableWidth: window.innerWidth * 0.9,
                loading: false
            }
        },
        computed: {
            role() {
                return this.$store.getters.role
            }
        },
        methods: {
            deleteUser(id) {
                this.$Modal.confirm({
                    title: '删除',
                    content: '确认删除该用户？',
                    onOk: () => {
                        deleteUser({id}).then(() => {
                            this.$Message.success({
                                content: '删除成功',
                                duration: 3
                            })
                            this.getData()
                        }).catch(() => {
                            this.$Message.warning({
                                content: '删除失败',
                                duration: 3
                            })
                        })
                    },
                    onCancel: () => {
                    },
                    okText: '删除',
                    cancelText: '取消'
                });
            },
            setHighRole(id) {
                setHighRole({id}).then(() => {
                    this.$Message.success({
                        content: '设置成功',
                        duration: 3
                    })
                    this.getData()
                }).catch(() => {
                    this.$Message.warning({
                        content: '设置失败',
                        duration: 3
                    })
                })
            },
            searchByName(name) {
                this.filter.username = name
                this.getData()
            },
            searchByAccount(account) {
                this.filter.account = account
                this.getData()
            },
            rowClassName (row, index) {
                if(index % 2 === 0) {
                    return 'table-row-first'
                }else {
                    return 'table-row-second'
                }
            },
            doPost(cb) {
                let para = this.filter
                getUserList(para).then(res => {
                    console.log(res)
                    cb && cb(res)
                }).catch(() => {
                    cb && cb([])
                })
            },
            getData() {
                if(this.loading) return
                this.loading = true
                this.doPost(data => {
                    this.data = data
                    this.loading = false
                })
            }
        },
        components: {
            Searchbar
        },
        mounted() {
            this.getData()
        }
    }
</script>

<style lang="scss">
    .book-manager-wrap {

        .ivu-table-wrapper {
            border: 0;
            width: 100%;
            height: 100%;
        }
        .ivu-spin-fix {
            background-color: rgba(0, 0, 0, .5);
            border: 0;
        }
        .ivu-table{
            background-color: transparent;
            border: 0;

            th, td {
                background-color: transparent;
                color: #fff;
                border: 0;
            }

            thead {
                background-color: rgba(0, 0, 0, .1);
            }
            &:before {
                background-color: transparent;
            }
            &:after {
                background-color: transparent;
            }
        }
        .table-row-first {
            background-color: transparent;
            color: #fff;
            transition: background-color .3s;

            &:hover {
                background-color: rgba(0, 0, 0, .2);
            }
        }
        .table-row-second {
            background-color: rgba(0, 0, 0, .1);
            color: #fff;
            transition: background-color .2s;

            &:hover {
                background-color: rgba(0, 0, 0, .3);
            }
        }
        .button-box {
            font-size: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .button-item {
            font-size: 0.75rem;
            padding: 0.1rem 0.5rem;
            color: #fff;
            margin: 0.75rem;
            border: 1px solid #fff;
            border-radius: 2px;
            cursor: pointer;
            transition: all .1s;

            &:hover {
                background-color: #fff;
                border-color: #000;
                color: #000;
            }
            &:first-child {
                margin-left: 0;
            }
            &:last-child {
                margin-right: 0;
            }
        }
    }
</style>

<style lang="scss" scoped>
    .book-manager-wrap {
        padding: 2rem;

        .header {
            height: 4rem;
            display: flex;

            .searchTool {
                margin-right: 2rem;
            }
        }
        .main {
            height: calc(100% - 4rem);
            /*background-color: rgba(0, 0, 0, .1);*/
        }
        /*.footer {*/
        /*height: 4rem;*/
        /*}*/
    }
</style>
