<template>
    <section>
        hello
    </section>
</template>

<script>
    export default {
        mounted() {
            console.log(this.$store.getters)
            console.log(this.$route)
        }
    }
</script>

<style lang="scss" scoped>

</style>
