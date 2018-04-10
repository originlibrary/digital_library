<template>
    <section class="book-index">
        <transition name="fade">
            <router-view/>
        </transition>
    </section>
</template>

<script>
    export default {}
</script>

<style lang="scss" scoped>
    .book-index {
        width: 100%;
        height: 100%;

        .fade-enter-active, .fade-leave-active {
            transition: all .2s
        }
        .fade-enter {
            opacity: 0;
        }
        .fade-leave-active {
            opacity: 0;
        }
    }
</style>
