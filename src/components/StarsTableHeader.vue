<template>
  <td @click="clickHeader()" class="stars-table-header" v-bind:class="[sortField, {active: active}]">
    <h5>{{displayName}} <span v-if="active" class="sortIcon">{{directionIndicator}}</span></h5>
  </td>
</template>

<script>
  export default {
    name: "stars-table-header",
    props: ["displayName", "sortField"],
    computed: {
      active: function () {
        return this.$store.state.stars.sortField === this.sortField
      },
      directionIndicator: function () {
        return this.$store.state.stars.sortOrder === "asc" ? "▲" : "▼"
      }
    },
    methods: {
      clickHeader: function () {
        this.$store.dispatch("sortBy", this.sortField)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .stars-table-header {
    position: sticky;
    top: 0;
    padding: 0;
    text-align: center;
    background: linear-gradient(to bottom, #4c4c4c 0%, #595959 12%, #666666 25%, #474747 39%, #2c2c2c 50%, #000000 51%, #111111 60%, #2b2b2b 76%, #1c1c1c 91%, #131313 100%);
    cursor: pointer;
  }
</style>
