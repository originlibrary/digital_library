<template>
    <section class="slider-wrap">
        <ul class="slider-ul">
            <router-link :to="item.path" v-for="item in list" :key="item.path">
                <li :class="['slider-li', $route.path === item.path ? 'active-li' : '']">
                    {{item.label}}
                </li>
            </router-link>
        </ul>
    </section>
</template>

<script>
    const list = [
        {
            label: '首页',
            path: '/Hello'
        },
        {
            label: '图书',
            path: '/Book'
        },
        {
            label: '下载',
            path: '/Download'
        },
        {
            label: '用户管理',
            path: '/User'
        }
    ]
    export default {
        data() {
            return {
                list
            }
        }
    }
</script>

<style lang="scss" scoped>
    .slider-wrap {
        width: 12.5rem;
        border-right: 1px solid #fff;

        .slider-ul {
            width: 100%;
            height: 100%;
            list-style: none;
        }
        .slider-li {
            list-style: none;
            height: 3rem;
            line-height: 3rem;
            text-align: center;
            font-size: 1rem;
            color: #fff;
            cursor: pointer;

            &:hover {
                background-color: rgba(7, 17, 27, .2);
            }
        }
        .active-li {
            background-color: rgba(7, 17, 27, .8) !important;
        }
    }
</style>
