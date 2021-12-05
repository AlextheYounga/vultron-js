<template>
    <Navbar v-if="showNavbar" />
	<router-view></router-view>
</template>

<script>
    import Navbar from "@/components/Navbar.vue"

    export default {
        components: {
            Navbar,
        },
		created() {
			this.$router.push('/')
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
