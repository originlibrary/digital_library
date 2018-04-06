<template>
    <section class="book-wrap" id="book-wrap">
        <template v-for="(item, index) in rowList">
            <Row :gutter="16" :key="index">
                <Col span="6" v-for="(x, idx) in item" :key="idx">
                    <Card :key="index" shadow>
                        <p slot="title">
                            <Icon type="document-text"></Icon>
                            {{x}}
                        </p>
                        <img src="https://file.iviewui.com/dist/76ecb6e76d2c438065f90cd7f8fa7371.png" alt="" style="width: 85px;height: 85px;">
                    </Card>
                </Col>
            </Row>
            <br />
        </template>
    </section>
</template>

<script>
    import _ from 'lodash'
    export default {
        data() {
            return {
                list: _.range(20)
            }
        },
        mounted() {
            console.log(this.itemWidth)
            console.log('ss', this.rowList)
        },
        computed: {
            itemCount() {
                return 4
            },
            rowList() {
                let rows = []
                this.list.forEach((x, i) => {
                    rows[~~(i / this.itemCount)] = rows[~~(i / this.itemCount)] || []
                    rows[~~(i / this.itemCount)].push(x)
                })
                return rows
            }
        }
    }
</script>

<style lang="scss" scoped>
    .book-wrap {

    }
</style>
