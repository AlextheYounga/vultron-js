<template>
  <p :class="`status-bubble px-2 inline-flex text-xs leading-5 font-semibold rounded-full h-5 ${classes[formattedStatus]}`">
    {{ text || formattedStatus }}
  </p>
</template>

<script>
  export default {
    name: "StatusBubble",
    props: ["status", "text"],
    data() {
      const colors = {
        green: "bg-green-100 text-green-800",
        yellow: "bg-yellow-100 text-yellow-800",
        red: "bg-red-100 text-red-800",
        blue: "bg-red-100 text-red-800"

      }
      return {
        colors: colors,
        classes: {
          Active: colors.green,
          Inactive: colors.red,
        }
      }
    },
    computed: {
      formattedStatus: function () {
        let status = this.$props.status;
        if (status == 0 || status == 1) {
          return (status == 0) ? 'False' : 'True';
        }

        if (typeof status == 'string') {
          return status.toTitleCase();
        }
        return status;
      },
    },
  }
</script>

<style scoped>
  p {
    text-transform: capitalize;
  }
</style>
