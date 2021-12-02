<template>
  <component
    :is="comp"
  ></component>
</template>


<script>
  import { defineAsyncComponent } from "vue";

  export default {
    name: "HeroIcon",
    //I am passing the name of the Component as a prop
    props: {
      iconName: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: "solid"
      }
    },
    computed: {
      comp() {
        return defineAsyncComponent(() => import(`@heroicons/vue/${this.type}/${this.iconName}Icon.js`))
      }
    }
  }
</script>
