<template>
    <section class="bookReviewWrap">
        <iframe class="review-box" :src="`/static/plugins/pdf/web/viewer.html?file=${url}`" frameborder="0"></iframe>
    </section>
</template>
<script>
    export default {
        data() {
            console.log(this.$route.query.url)
            return {
                // url: (this.$route.query.url + '&review=1') || '#'
                url: (this.$route.query.url) || '#'
            }
        }
    }
</script>
<style lang="scss" scoped>
    .bookReviewWrap {
        width: 100%;
        height: 100%;

        .review-box {
            width: 100%;
            height: 100%;
        }
    }
</style>
