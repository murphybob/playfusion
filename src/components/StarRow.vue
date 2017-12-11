<template>
  <tr class="star-row">
    <td v-bind:class="{unset: !star.name}">
      {{star.name}}
    </td>
    <td v-bind:class="{unset: !star.distance}">
      {{star.distance}}
    </td>
    <td v-bind:class="{unset: !star.numberOfPlanets}">
      {{star.numberOfPlanets}}
    </td>
  </tr>
</template>

<script>
  export default {
    name: "star-row",
    props: ["star"]
  }
</script>

<style lang="scss" scoped>
  .star-row {
    background: rgba(0, 255, 254, 0.38);
    
    &:hover {
      box-shadow: inset 0 0 20px rgb(0, 255, 254);
    }
    
    td {
      padding: 0.5em 0.25em;
    }
  }
</style>
