<template>
    <section class="book-manager-wrap">
        <div class="header">
            <div class="managerButton" @click="goBack">返回</div>
            <input type="file" ref="upload" @change="uploadBook" v-show="false">
            <div class="managerButton" @click="goBack">上传图书</div>
            <Searchbar placeholder="按书名搜索" v-model="filter.name" @search="searchByName" class="searchTool"/>
            <Searchbar placeholder="按作者搜索" v-model="filter.author" @search="searchByAuthor" class="searchTool"/>
        </div>
        <div class="main">
            <!--<div class="book-list">-->
                <!--<BookCell2 v-for="(book, i) in data" :idx="i" :data="book" :key="book.id"/>-->
            <!--</div>-->
            <Table :width="tableWidth" :loading="loading" :row-class-name="rowClassName" :columns="columns" :data="data"></Table>
        </div>
        <Modal
            v-model="modal"
            :title="isEdit ? '修改图书' : '上传图书'">
            <Form ref="form" :model="form" :rules="formRules" :label-width="60" style="width: 95%;">
                <FormItem label="名称" prop="name">
                    <Input v-model="form.name" placeholder="输入名称"/>
                </FormItem>
                <FormItem label="作者">
                    <Input v-model="form.author" placeholder="输入描述"/>
                </FormItem>
                <FormItem label="译者">
                    <Input v-model="form.translator" placeholder="输入描述"/>
                </FormItem>
                <FormItem label="版本">
                    <Input v-model="form.version" placeholder="输入描述"/>
                </FormItem>
                <FormItem label="语言">
                    <Input v-model="form.language" placeholder="输入描述"/>
                </FormItem>
            </Form>
            <span slot="footer">
                <Button @click="modal = false">取消</Button>
                <Button type="primary" @click="submit">确定</Button>
            </span>
        </Modal>
        <!--<div class="footer"></div>-->
    </section>
</template>

<script>
    import Searchbar from '../../components/Searchbar'
    import BookCell2 from '../../components/BookCell2'
    import ScoreTool from '../../components/ScoreTool'
    import {getBookByType, deleteBook} from '../../api/book'

    export default {
        data() {
            return {
                columns: [
                    {
                        title: '书名',
                        key: 'name',
                        // width: 200,
                        align: 'center'
                    },
                    {
                        title: '类型',
                        key: 'typeName',
                        // width: 200,
                        align: 'center'
                    },
                    {
                        title: '作者',
                        key: 'author',
                        // width: 200,
                        align: 'center'
                    },
                    {
                        title: '译者',
                        key: 'translator',
                        // width: 200,
                        align: 'center'
                    },
                    {
                        title: '语言',
                        key: 'language',
                        // width: 200,
                        align: 'center'
                    },
                    {
                        title: '版本',
                        key: 'version',
                        // width: 200,
                        align: 'center'
                    },
                    {
                        title: '大小',
                        key: 'version',
                        // width: 200,
                        align: 'center'
                    },
                    {
                        title: '评分',
                        key: 'version',
                        // width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return (
                                <ScoreTool value={params.row.average_score} noSet/>
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
                    type: this.$route.query.type || '',
                    name: '',
                    author: ''
                },
                tableWidth: window.innerWidth * 0.92,
                loading: false,
                isEdit: false,
                form: {
                    name: '',
                    author: '',
                    translator: '',
                    version: '',
                    language: '',
                    coverUrl: '',
                    type: ''
                },
                formRules: {
                    name: [
                        { required: true, message: '类别名称不能为空', trigger: 'change' }
                    ]
                }
            }
        },
        computed: {
            role() {
                return this.$store.getters.role
            }
        },
        methods: {
            submit() {

            },
            deleteBook(id) {
                this.$Modal.confirm({
                    title: '删除',
                    content: '确认删除该书籍？',
                    onOk: () => {
                        deleteBook({id}).then(() => {
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
            uploadBook() {

            },
            rowClassName (row, index) {
                if(index % 2 === 0) {
                    return 'table-row-first'
                }else {
                    return 'table-row-second'
                }
            },
            clickUpload(id) {
                this.$refs.upload.onclick()
            },
            searchByName(name) {
                this.filter.name = name
                this.getData()
            },
            searchByAuthor(author) {
                this.filter.author = author
                this.getData()
            },
            goBack() {
                this.$router.go(-1)
            },
            doPost(cb) {
                let para = this.filter
                getBookByType(para).then(res => {
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
            Searchbar,
            BookCell2,
            ScoreTool
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
            align-items: center;

            .searchTool {
                display: inline-block;
                margin-right: 2rem;
                flex: none;
            }
            .managerButton {
                flex: none;
                user-select: none;
                display: inline-block;
                color: #fff;
                margin-right: 1.5rem;
                border: 1px solid #fff;
                border-radius: 3px;
                padding: 0.5rem 1rem;
                cursor: pointer;
                transition: .2s;

                &:hover {
                    background-color: #fff;
                    color: #000;
                    border-color: #fff;
                }
            }
        }
        .main {
            margin-top: 1rem;
            height: calc(100% - 5rem);
            /*background-color: rgba(0, 0, 0, .1);*/
        }
    }
</style>
