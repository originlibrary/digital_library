<template>
    <div class="search-bar">
        <input type="text" class="input-wrap" v-model="alignValue" :placeholder="placeholder" @keydown.enter="search">
        <a href="javascript:void(0)" class="input-button" @click="search">
            <Icon type="ios-search-strong" size="20" style="line-height: inherit"></Icon>
        </a>
    </div>
</template>

<script>
    export default {
        model: {
            prop: 'value',
            event: 'change'
        },
        props: ['placeholder', 'value'],
        data() {
            return {
                keyword: ''
            }
        },
        computed: {
            alignValue: {
                get() {
                    return this.value
                },
                set(v) {
                    this.$emit('change', v)
                }
            }
        },
        methods: {
            search() {
                this.$emit('search', this.value)
            }
        }
    }
</script>

<style scoped lang="scss">
    .search-bar {
        width: 400px;
        /*height: 46px;*/
        /*line-height: 46px;*/
    }

    .search-bar .input-wrap {
        float: left;
        width: 270px;
        height: 40px;
        padding: 0 15px;
        line-height: 40px;
        border: none;
        outline: none;
        font-size: 20px;
        border-radius: 20px 0 0 20px;
        background: rgba(255, 255, 255, 0.1);
        transition: all .8s;
        color: #fff;

        &::-webkit-input-placeholder {
            color: rgba(255, 255, 255, 0.2);
        }
    }

    .search-bar .input-wrap:focus {
        background: rgba(255, 255, 255, 0.3);
    }

    .search-bar .input-button {
        float: left;
        width: 50px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        font-size: 14px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-sizing: unset;
        transition: all .2s;

        &:hover {
            background-color: rgba(0, 0, 0, .5);
            color: #fff;
        }
    }

    .search-bar .input-wrap:focus .input-botton {
        border-color: rgba(255, 255, 255, 0.8);
    }
</style>
