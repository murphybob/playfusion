<template>
  <!-- I did this last, its way too big and wants splitting up a bit! -->
  <div class="search-page">
    <h1>Search</h1>
    <form class="search" @submit="doSearch">
      <router-link to="/" class="back">⬅ Back</router-link>
      <label>
        Search in star names
        <br>
        <input type="text" @change="changeSearchTerm" :value="search.term">
      </label>
      <button type="submit">Search!</button>
    </form>
    <!-- Given more time I would generalise StarTable and re-use here
         instead of rolling a virtually identical table and duplicating a
         bunch of logic and style -->
    <table>
      <thead>
        <tr>
          <td><h3>Match</h3></td>
          <td><h3>Canonical Name</h3></td>
          <td><h3>Distance (ly)</h3></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in results" @click="selectStar(row)">
          <td>{{row.name}}</td>
          <td>{{row.star.name}}</td>
          <td>{{row.star.distanceInLightYears}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import util from "@/util"
  
  export default {
    name: "search-page",
    data () {
      return {
        search: this.$store.state.search
      }
    },
    computed: {
      results () {
        return this.search.results.map((r) => {
          const star = r.star
          const ly = util.parsecsToLightYears(star.distance)
          star.distanceInLightYears = ly ? ly.toFixed(2) : null
          return r
        })
      }
    },
    methods: {
      changeSearchTerm (ev) {
        this.$store.dispatch("changeSearchTerm", ev.currentTarget.value)
      },
      doSearch (ev) {
        ev.preventDefault()
        this.$store.dispatch("search")
      },
      selectStar (result) {
        this.$store.dispatch("selectStarFromSearch", result)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-page {
    h1 {
      text-align: center;
    }
    .search {
      display: flex;
      justify-content: space-around;
      
      button {
        padding: 0 1em;
        background: rgba(0, 255, 254, 0.38);
      }
      
      .back {
        color: inherit;
        padding: 0.5em 0 0;
        text-decoration: none;
      }
    }
    
    // TODO: Reusing the StarTable here would get rid of this bad duplicated stuff
    table {
      margin: 1em 0;
      width: 100%;
      table-layout: fixed;
      text-align: center;
      border-collapse: separate;
      border-spacing: 0 1px;
      
      thead td {
        position: sticky;
        top: -1px; // To overcome the border spacing
        padding: 0;
        text-align: center;
        background: linear-gradient(to bottom, #4c4c4c 0%, #595959 12%, #666666 25%, #474747 39%, #2c2c2c 50%, #000000 51%, #111111 60%, #2b2b2b 76%, #1c1c1c 91%, #131313 100%);
        cursor: pointer;
      }
      
      tbody tr {
        background: rgba(0, 255, 254, 0.38);
    
        td {
          padding: 0.5em 0.25em;
          word-break: break-all;
        }
      }
    }
  }
</style>
