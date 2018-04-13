<template>
    <section class="book-index">
        <transition :name="fadeName">
            <router-view/>
        </transition>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                fadeName: 'fade-forward'
            }
        },
        watch: {
            '$route'(to, from) {
                let isBack = this.$router.isBack
                if(isBack) {
                    this.fadeName = 'fade-back'
                }else {
                    this.fadeName = 'fade-forward'
                }
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
