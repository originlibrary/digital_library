<template>
    <div class="score-tool" @mouseleave="score = value">
        <!--<Icon type="ios-star"></Icon>-->
        <!--<Icon type="ios-star-half"></Icon>-->
        <Icon
            :type="getType(n)"
            v-for="n in 5" class="star"
            :key="n"
            :color="getType(n) === 'ios-star-outline' ?  'gray': '#ffe54e'"
            :ref="`icon_${n}`"
            @click.native="setScore"
            @mousemove.native="e => mouseover(e, n)"
            size="16"></Icon>
    </div>
</template>

<script>
    export default {
        model: {
            prop: 'value',
            event: 'change'
        },
        props: {
            value: {
                type: Number,
                default: 0
            },
            noSet: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                score: this.value
            }
        },
        watch: {
            value(v) {
                this.score = v
            }
        },
        methods: {
            setScore() {
                this.$emit('change', this.score)
            },
            mouseover(e, n) {
                if(this.noSet) return
                let target = this.$refs[`icon_${n}`][0].$el
                let posi = target.getBoundingClientRect()
                let mouseX = e.clientX
                let targetX = posi.left,
                    targetWidth = posi.width
                if(mouseX >= targetX && mouseX < targetX + targetWidth / 2) {
                    this.score = n * 2 - 1
                }else if(mouseX >= targetX + targetWidth / 2 && mouseX < targetX + targetWidth) {
                    this.score = n * 2
                }
            },
            getType(n) {
                let value = this.score
                let thisV = n * 2
                if(value >= thisV) {
                    return 'ios-star'
                }
                if(value < thisV && value > thisV - 2) {
                    return 'ios-star-half'
                }
                if(value <= thisV - 2) {
                    return 'ios-star-outline'
                }
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    .score-tool {

        .star {
            margin: 0 2px;
        }
    }
</style>
