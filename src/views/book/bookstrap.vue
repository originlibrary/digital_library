<template>
    <section class="book-wrap">
        <!--<template v-for="(item, index) in rowList">-->
        <!--<Row :gutter="16" :key="index">-->
        <!--<Col span="6" v-for="(x, idx) in item" :key="idx">-->
        <!--<Card :key="index" shadow>-->
        <!--<p slot="title">-->
        <!--<Icon type="document-text"></Icon>-->
        <!--{{x}}-->
        <!--</p>-->
        <!--<img src="https://file.iviewui.com/dist/76ecb6e76d2c438065f90cd7f8fa7371.png" alt="" style="width: 85px;height: 85px;">-->
        <!--</Card>-->
        <!--</Col>-->
        <!--</Row>-->
        <!--<br />-->
        <!--</template>-->
        <div class="button-box">
            <div class="managerButton" @click="gotoBookType">管理图书</div>
        </div>
        <div class="bookstrap" v-for="(item, i) in list" :key="item.typeMsg.id">
            <div class="typeMsg">{{item.typeMsg.name}}</div>
            <div class="book-list">
                <div v-for="(book,bi) in item.books" :key="book.id" class="book">
                    <BookCell :data="book" v-if="book !== 'more'"/>
                    <div v-if="book === 'more'" class="book-more-box">
                        <Icon type="more" class="book-more-icon"></Icon>
                    </div>
                </div>
                <!--<div :class="['book', book === 'more' ? 'book-more' : '']" v-for="book in item.books">
                    <img :src="book.coverUrl" alt="" class="bookCover" v-if="book !== 'more'">
                    <div class="bookMsg" v-if="book !== 'more'">
                        {{book.name}}
                    </div>
                    <ScoreTool class="book-score" :value="book.averageScore" noSet v-if="book !== 'more'"/>
                    <div v-if="book === 'more'" class="book-more-box">
                        <Icon type="more" class="book-more-icon"></Icon>
                    </div>
                </div>-->
            </div>
        </div>
    </section>
</template>

<script>
    import { getBookStrap } from '../../api/book'
    import ScoreTool from '../../components/ScoreTool'
    import BookCell from '../../components/BookCell'

    export default {
        data() {
            return {
                list: []
            }
        },
        mounted() {
            this.getList()
        },
        computed: {
        },
        methods: {
            gotoBookType() {
                this.$router.push('/BookType')
            },
            getList() {
                getBookStrap().then(res => {
                    this.list = this.formatRes(res)
                    console.log(111, this.list)
                }).catch(() => {

                })
            },
            formatRes(list) {
                if(!list instanceof Array) return []
                return list.map(item => {
                    item.books.forEach(book => {
                        book.coverUrl = (process.env.NODE_ENV === 'development' ? 'http://localhost:8033' : '') + book.coverUrl
                        // book.coverUrl = '/api' + book.coverUrl
                        book.averageScore = book.averageScore ? parseInt(book.averageScore) : 0
                    })
                    item.books.push('more')
                    return item
                })
            }
        },
        components: {
            ScoreTool,
            BookCell
        }
    }
</script>

<style lang="scss" scoped>
    .book-wrap {
        width: 100%;
        padding: 1rem 2rem;

        .bookstrap {
            margin-bottom: 1.5rem;
            height: 15rem;
            flex: none;
            /*background-image: url("../../assets/images/book/banner2.png");*/
            background-repeat: round;
            opacity: 0.85;
            box-shadow: 0 0 2px 0 #fff;
            position: relative;
        }
        .typeMsg {
            position: absolute;
            color: #fff;
            font-size: 1rem;
            padding: 0.5rem 0.8rem;
        }
        .book-list {
            margin: 0 auto;
            width: 80%;
            height: 100%;
            display: flex;
            align-items: center;
        }
        .book {
            width: 12rem;
            flex: none;
            margin: 0 4.5rem;
            background-repeat: round;
            text-align: center;
            transition: all .3s;
            cursor: pointer;

            &:hover {
                transform: scale(1.1);
            }
            &:first-child {
                margin-left: 0;
            }
            &:last-child {
                margin-right: 0;
            }
        }
        .bookCover {
            width: 6.3rem;
            height: 7rem;
            box-shadow: 0 0 3px 3px #fff;
            border: 0;
        }
        .bookMsg {
            margin-top: 1rem;
            height: 2rem;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            white-space: inherit;
        }
        .book-score {
            margin-top: 0.5rem;
        }
        .book-more {
            justify-self: flex-end;
        }
        .book-more-box {
            width: 100%;
            height: 9rem;
            display: flex;
            justify-content: center;
            align-items: center;

            &:hover {
                color: aqua;
            }
        }
        .book-more-icon {
            font-size: 3rem;
            color: inherit;
            transition: color .3s;
        }
        .button-box {
            margin-bottom: 1.5rem;
        }
        .managerButton {
            user-select: none;
            display: inline-block;
            color: #fff;
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
