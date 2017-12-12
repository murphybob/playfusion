<template>
  <tr class="star-row" v-bind:class="{selected}" @click="selectStar()">
    <td v-bind:class="{unset: !star.name}">
      {{star.name}}
    </td>
    <td v-bind:class="{unset: !star.distance}">
      {{distanceInLightYears}}
    </td>
    <td v-bind:class="{unset: !star.numberOfPlanets}">
      {{star.numberOfPlanets}}
    </td>
  </tr>
</template>

<script>
  import util from "@/util"
  
  export default {
    name: "star-row",
    props: ["star"],
    computed: {
      distanceInLightYears () {
        const d = this.star.distance
        return d ? util.parsecsToLightYears(d).toFixed(2) : null
      },
      selected () {
        return this.star === this.$store.state.stars.selected
      }
    },
    methods: {
      selectStar () {
        this.$store.dispatch("selectStar", this.star)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .star-row {
    background: rgba(0, 255, 254, 0.38);
    
    &.selected {
      box-shadow: inset 0 0 20px rgb(0, 255, 254);
    }
    
    td {
      padding: 0.5em 0.25em;
      word-break: break-all;
    }
  }
</style>
