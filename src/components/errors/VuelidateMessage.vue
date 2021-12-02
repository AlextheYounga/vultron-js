<template v-if="$props.modelValue?.$error">
    <strong
        v-if="$props.modelValue?.$errors[0]?.$message"
        class="px-4 mt-1 mb-4 text-sm rounded-none border-0 text-red-400"
    >
        {{ $props.modelValue?.$errors[0].$message }}
    </strong>
</template>
<script>
    export default {
        props: {
            modelValue: Object,
        },
    };
</script>