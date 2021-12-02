<template>
    <Navbar v-if="showNavbar" />
</template>

<script>
    import Navbar from "@/components/Navbar.vue"

    export default {
        components: {
            Navbar,
        },
        computed: {
            showNavbar() {
                let route = this.$route.name
                if (route && route.includes('auth')) {
                    return false
                }
                return true
            }
        }
    };
</script>
<style lang="css">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
