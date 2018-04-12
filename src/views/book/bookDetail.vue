<template>
    <section class="book-detail-container">
        <div class="managerButton" @click="goBack">返回</div>
        <div class="book-detail">
            <div class="book-detail-left-image">
                <img :src="bookDetails.cover_url" alt="">
            </div>
            <div class="book-detail-right-content">
                <div class="book-name"><span class="label">书名 :</span>{{bookDetails.name}}</div>
                <div class="book-author"><span class="label">作者 :</span>{{bookDetails.author}}</div>
                <div class="book-author">图书分类 : {{bookDetails.remark}}</div>
                <div class="book-author">
                    <span>平均评分 ： </span>
                    <ScoreTool style="display: inline-block;" :value="bookDetails.average_score" noSet/>
                </div>
                <div v-if="role != 3">
                    <div class="download-button" @click="download">
                        <a :href="bookDetails.file_url" target="_blank">下载</a>
                    </div>
                    <div class="view-button" @click="showBook">预览</div>
                </div>
                <div class="download-button-container">
                    <div class="byte-size">文件大小 : {{parseInt(bookDetails.byte_size/1000/1024)}}M</div>
                    <div class="download-count">下载量 : {{bookDetails.downloadCount}}</div>
                </div>
            </div>
        </div>
        <div class="book-top-by-type">
            <div class="title">{{bookDetails.remark}}分类Top5</div>
            <div class="book-item-container">
                <div class="book-item" :key="item.id" v-for="(item,index) in topFive" @click="changeBook(item)">
                    <div class="book-image">
                        <img :src="item.cover_url" alt="">
                    </div>
                    <div class="book-name">{{item.name}}</div>
                    <div class="score-box">
                        <ScoreTool :value="item.average_score" noSet/>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {getBookDetailsById,getTopFiveByType} from "../../api/book"
    import ScoreTool from '../../components/ScoreTool'
    import {addDownload} from '../../api/download'

    export default {
        data() {
            return {
                id: this.$route.query.id,
                type: this.$route.query.type,
                bookDetails: {},
                topFive:[],
            }
        },
        computed: {
            role() {
                return this.$store.getters.role
            }
        },
        components: {
            ScoreTool
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            changeBook(book) {
                this.bookDetails = book
            },
            getBookDetailsById() {
                let params = {
                    id: this.id
                }
                getBookDetailsById(params).then(res => {
                    console.log("getBookDetailsById", res)
                    if (res.length) {
                        this.bookDetails = res[0]
                    }

                }).catch(err => {
                    console.log("err", err)
                })
            },
            getTopFiveByType() {
                let params = {
                    type: this.type
                }
                getTopFiveByType(params).then(res => {
                    console.log("getTopFiveByType", res)
                    if (res.length) {
                        this.topFive = res
                    }

                }).catch(err => {
                    console.log("err", err)
                })
            },
            showBook(){
                console.log("预览----")
                // todo:
            },
            download() {
                let para = {
                    userId: this.$store.getters.id,
                    bookId: this.bookDetails.id
                }
                addDownload(para).then(res => {
                    if(res === 'success') {
                        console.log('success')
                    }else {
                        console.log('failed')
                    }
                }).catch(() => {
                    console.log('failed')
                })
            }
        },
        mounted() {
            this.getBookDetailsById()
            this.getTopFiveByType()
        }
    }
</script>

<style lang="scss" scoped>
    .book-detail-container {
        padding: 1rem 2rem;
        width: 100%;
        font-size: 16px;
        font-family: 黑体;
        font-weight: bold;
        user-select: none;

        .managerButton {
            flex: none;
            user-select: none;
            display: inline-block;
            color: #fff;
            font-size: 0.75rem;
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
        .book-detail {
            width: 60rem;
            height: 20rem;
            margin: 3rem auto;
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .book-detail-left-image{
                width: 14rem;
                height: 16rem;
                margin: 2rem;
                border: 1px solid #fff;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .book-detail-right-content{
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                width: calc(100% - 16rem);
                height: 16rem;
                margin: 2rem 2rem;

                .label{
                    margin-right: 0.5rem;
                    color: #fff!important;
                }

                .book-name{
                    font-size: 22px;
                }

                .book-author{
                    margin-top: 1rem;
                    color: #eee;
                    margin-left: 2rem;
                }

                .download-button{
                    height: 32px;
                    width: 120px;
                    border: 1px solid #f36f20;
                    line-height: 28px;
                    text-align: center;
                    float: left;
                    margin-right: 15px;
                    cursor: pointer;
                    background-color: #f36f20;
                    color: #fff;
                    margin-top: 2rem;
                    margin-left: 1rem;

                    a {
                        color: #fff;
                    }
                }

                .view-button{
                    height: 32px;
                    width: 120px;
                    border: 1px solid #f36f20;
                    line-height: 28px;
                    text-align: center;
                    float: left;
                    margin-right: 15px;
                    cursor: pointer;
                    color: #f36f20;
                    margin-top: 2rem;
                    margin-left: 1rem;
                }

                .download-button:hover{
                    background-color: rgba(243,112,32,0.5);
                    color: #f36f20;
                }

                .view-button:hover{
                    background-color: rgba(255,255,255,0.1);
                }

                .download-button-container{
                    width: 100%;
                    margin-top: 2rem;
                    display: flex;
                    align-items: center;
                    margin-left: 1rem;

                    .download-count{
                        color: #ebebeb;

                    }

                    .byte-size{
                        margin-right: 1rem;
                    }
                }
            }
        }

        .book-top-by-type{
            width: calc(100% - 10rem);
            height: calc(100% - 20rem);
            margin: 0 auto;

            .title{
                margin: 0.5rem 0 0.5rem 1rem;
                color: #e2e2e2;
                font-size: 14px;
            }

            .book-item-container{

                display: flex;
                justify-content: space-around;
                align-items: flex-start;

                .book-item{
                    width: calc(20% - 4rem);
                    margin: 0 2rem;
                    cursor: pointer;
                    transition: background-color .1s;
                    border-radius: 0.5rem;

                    &:hover {
                        background-color: rgba(0, 0, 0, .2);
                    }

                    .book-image{
                        height: 10rem;
                        width: 8rem;
                        margin: 1rem auto;
                        border: 1px solid #fff;

                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .book-name{
                        width: 100%;
                        height: 4rem;
                        line-height: 2rem;
                        overflow: hidden;
                        word-break: break-all;
                        text-align: center;
                    }
                    .score-box {
                        text-align: center;
                    }
                }
            }
        }
    }
</style>
