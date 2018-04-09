<template>
    <section class="book-type-wrap">
        <div class="header">
            <div class="managerButton" @click="gotoBookType">管理图书</div>
        </div>
        <div class="main">
            <div class="type-list">
                <div class="type-item-add"></div>
                <div class="type-item" v-for="(item, i) in list" :key="item.id || i">
                    <i class="ivu-icon toolIcon editFolder ivu-icon-edit" @click="editFolder(i)" title="修改"></i>
                    <i class="ivu-icon toolIcon deleteFolder ivu-icon-android-delete" @click="deleteFolder(item.id)"
                       title="删除"></i>
                    <div class="type-page">
                        <div :title="item.name" class="title">{{item.name}}</div>
                        <!--<div class="remark">{{item.remark}}</div>-->
                        <div class="remark">{{item.remark}}</div>
                        <div class="data_num">{{item.bookNum}}</div>
                    </div>
                </div>
            </div>
        </div>
        <Modal
            v-model="modal"
            :title="isEdit ? '修改分类' : '添加分类'"
            @on-ok="submit"
            @on-cancel="modal = false">
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </Modal>
    </section>
</template>

<script>
    import Searchbar from '../../components/Searchbar'
    import {getAllTypes, deleteType, addType, updateType} from '../../api/book'

    export default {
        data() {
            return {
                list: [],
                modal: false,
                isEdit: false
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
            editFolder(i) {
                this.isEdit = true
                this.modal = true
            },
            deleteFolder(id) {
                this.$Modal.confirm({
                    title: '删除',
                    content: '确认删除该类别？类别下的图书将归档至默认类别',
                    onOk: () => {
                        deleteType({id}).then(() => {
                            this.$Message.success({
                                content: '删除成功',
                                duration: 3
                            })
                            this.getList()
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
            gotoBookType() {},
            getList() {
                getAllTypes().then(res => {
                    this.list = res
                }).catch(() => {
                    this.$Message.warning({
                        content: '查询异常',
                        duration: 3
                    })
                })
            }
        },
        components: {},
        mounted() {
            this.getList()
        }
    }
</script>

<style lang="scss" scoped>
    .book-type-wrap {
        width: 100%;
        height: 100%;
        padding: 2rem;

        $titleColor: #ffffff;
        $remarkColor: rgba(255, 255, 255, 0.8);

        .header {
            height: 4rem;
            padding: 0 1rem;
        }
        .main {
            height: calc(100% - 4rem);
        }
        .type-list {
            display: flex;
            flex-flow: row wrap;
        }
        .type-item-add {
            width: 16rem;
            height: 10rem;
            margin-bottom: 2rem;
            margin-right: 2rem;
            background-image: url("../../assets/images/book/newFolder.png");
            background-repeat: round;
            position: relative;
            transition: .3s;

            &:hover {
                transform: scale(1.05);
            }
        }
        .type-item {
            width: 16rem;
            height: 10rem;
            margin-bottom: 2rem;
            margin-right: 2rem;
            background-image: url("../../assets/images/book/folder-back.png");
            background-repeat: round;
            position: relative;
            user-select: none;
            cursor: pointer;

            &:hover .type-page {
                transform: skewX(10deg) rotateX(12deg);
                left: -0.64rem;
                bottom: -0.11rem;
                height: 85%;
            }
            &:hover .toolIcon {
                opacity: 1;
            }
        }
        .type-page {
            width: 100%;
            height: 90%;
            position: absolute;
            left: 0;
            bottom: 0;
            transition: .2s;
            background-image: url("../../assets/images/book/folder-page.png");
            background-repeat: round;

            .title {
                width: 55%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                position: absolute;
                left: 2.5rem;
                top: 2.3rem;
                font-size: 1.4rem;
                color: $titleColor;
            }
            .remark {
                width: 65%;
                height: 2.5rem;
                word-wrap: break-word;
                overflow: hidden;
                position: absolute;
                left: 2rem;
                top: 4.5rem;
                font-size: 1rem;
                transform: scale(0.9);
                color: $remarkColor;
            }
            .data_num {
                position: absolute;
                right: 2rem;
                top: 2.5rem;
                font-size: 3rem;
                font-weight: bold;
                color: #ffffff;
            }
        }
        .toolIcon {
            position: absolute;
            top: 1.2rem;
            font-size: 1.2rem;
            opacity: 0;
            color: $remarkColor;
            transition: .3s;
            z-index: 1;

            &:hover {
                transform: scale(1.2);
            }
        }
        .editFolder {
            right: 2.8rem;
        }
        .deleteFolder {
            right: 1.3rem;
        }
        .managerButton {
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
</style>
