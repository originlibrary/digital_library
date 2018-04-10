<template>
    <div class="channel-body">
        <div class="book-item-container">
            <em class="book-item-index">{{idx}}.</em>
            <div class="book-item-image-container">
                <img :src="data.cover_url" alt="" class="book-item-image">
            </div>
            <h3>{{data.name}}</h3>
            <div></div>
            <p>计算机 / 软件</p>
        </div>
    </div>
</template>

<script>
    import ScoreTool from './ScoreTool'

    export default {
        props: {
            idx: Number,
            data: {
                type: Object,
                default: () => {
                    return {
                        id: '',
                        coverUrl: '',
                        name: '',
                        averageScore: 0
                    }
                }
            }
        },
        data() {
            console.log(this.data)
            return {}
        },
        methods: {
            clickBook() {
                this.$emit('click', this.data.id)
            }
        },
        components: {
            ScoreTool
        }
    }
</script>

<style lang="scss" scoped>
    .channel-body {
        .book-item-container {
            overflow: hidden;
            margin-bottom: -1px;
            padding: 16px 0;
            border-bottom: 1px dashed #e2e2e2;
            display: block;
            cursor: pointer;

            .book-item-index {
                display: block;
                float: left;
                width: 32px;
                line-height: 32px;
                font-size: 24px;
                font-family: fzfont;
            }
            .book-item-image-container {
                width: 120px;
                height: 120px;
                border: 1px solid #fff;
                float: left;
                margin-right: 10px;

                .book-item-image {

                    width: 120px;
                    margin-right: 16px;
                }
            }
            p {
                margin: 10px 0;
            }
        }
    }
</style>
