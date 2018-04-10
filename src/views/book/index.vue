<template>
    <section class="book-index">
        <transition :name="fadeName">
            <router-view/>
        </transition>
    </section>
</template>

<script>
    export default {
        computed: {
            fadeName() {
                return this.$store.getters.backOrForward === 'back' ? 'fade-back' : 'fade-forward'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .book-index {
        width: 100%;
        height: 100%;
        position: relative;

        .fade-forward-enter-active, .fade-forward-leave-active {
            transition: all .5s
        }
        .fade-back-enter-active, .fade-back-leave-active {
            transition: all .5s
        }

        .fade-forward-enter {
            opacity: 0;
            transform: translateX(100%);
        }
        .fade-forward-leave-active {
            position: absolute !important;
            opacity: 0;
            transform: translateX(-100%);
        }
        .fade-back-enter {
            opacity: 0;
            transform: translateX(-100%);
        }
        .fade-back-leave-active {
            position: absolute !important;
            opacity: 0;
            transform: translateX(100%);
        }
    }
</style>
