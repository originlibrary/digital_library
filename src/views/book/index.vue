<template>
    <section class="book-wrap">
        <div v-for="(item, index) in list">
            <Card style="width: 200px" :key="index">
                {{item}}
            </Card>
        </div>
    </section>
</template>

<script>
    import _ from 'lodash'
    export default {
        data() {
            return {
                list: _.range(10)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .book-wrap {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>
