<template>
  <table class="stars-table">
    <thead>
      <tr>
        <stars-table-header displayName="Name" sortField="name"></stars-table-header>
        <stars-table-header displayName="Distance (km)" sortField="distance"></stars-table-header>
        <stars-table-header displayName="Exoplanets" sortField="numberOfPlanets"></stars-table-header>
      </tr>
    </thead>
    <tbody>
      <star-row v-for="star in stars.results" :key="star.id" :star="star"></star-row>
      <tr v-if="stars.truncated">
        <td colspan="3"><infinite-loading @infinite="getMoreStars" ref="inf"></infinite-loading></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import StarRow from "./StarRow"
  import StarsTableHeader from "./StarsTableHeader"
  import InfiniteLoading from "vue-infinite-loading"
  
  export default {
    components: {
      StarsTableHeader,
      StarRow,
      InfiniteLoading
    },
    name: "stars-table",
    data () {
      return {
        stars: this.$store.state.stars
      }
    },
    methods: {
      getMoreStars: function ($state) {
        this.$store.dispatch("moreStars").then($state.loaded)
      }
    },
    created: function () {
      /* This is required because of the behaviour of the infinite loading plugin.
         It triggers a load when either
         a) It has just been created
         b) It is within x pixels of the bottom of the screen
         
         We rely on behaviour 'a' to do the initial load, so when we reset the results
         we need this init behaviour to happen again, but the component isn't being
         re-created so we manually inform it that a reset has occurred.
       */
      this.$store.watch(
        (state) => state.stars.results,
        (results) => {
          if (results.length === 0) {
            this.$refs.inf.$emit("$InfiniteLoading:reset", {})
          }
        }
      )
    }
  }
</script>

<style lang="scss" scoped>
  .stars-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 1px;
    table-layout: fixed;
    
    .loading {
      text-align: center;
    }
  }
</style>
