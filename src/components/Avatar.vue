<template>
    <div class="circle rounded-full bg-indigo-50 text-center">
        <span class="initials relative text-indigo-600">{{ initials }}</span>
    </div>
</template>
<script>
    export default {
        props: {
            name: String,
        },
        data() {
            return {
                initials: this.findInitials(this.$props.name)
            }
        },
        methods: {
            findInitials(name) {
                let words = name.split(' ')
                let initials = ""
                for (var word of words) {
                    initials = initials += word[0]
                }
                return initials
            }
        }
    }
</script>
<style scoped>
    .circle {
        height: 2rem;
        width: 2rem;
    }
    .initials {
        font-size: calc(2rem / 2); /* 50% of parent */
        line-height: 1;
        top: calc(2rem / 4); /* 25% of parent */
    }
</style>