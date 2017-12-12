<template>
  <div class="info-item" v-if="data">
    <h3>{{displayName}}:</h3>
    <span class="data">{{data}}</span>
    <span v-if="unit" class="unit">{{unit}}</span>
  </div>
</template>

<script>
  export default {
    name: "info-item",
    props: ["displayName", "data", "unit"]
  }
</script>

<style lang="scss" scoped>
  .info-item {
    font-size: 1.2em;
    
    h3 {
      display: inline;
      margin: 0 0.5em 0 0;
      vertical-align: baseline;
      line-height: 1.5em;
      font-size: inherit;
    }
  }
</style>
