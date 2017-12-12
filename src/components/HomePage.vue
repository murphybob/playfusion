<template>
  <div class="home-page">
    <h1>Welcome Starlord</h1>
    <stars-table></stars-table>
    <router-link to="settings" class="icon settings-icon" title="Settings">
      <img src="../assets/settings.svg" alt="Settings">
    </router-link>
    <router-link to="search" class="icon search-icon" title="Search">
      <img src="../assets/search.svg" alt="Search">
    </router-link>
  </div>
</template>

<script>
  import StarsTable from "./StarTable/StarsTable"
  import StarDetailDialog from "./StarDetailDialog/index"

  export default {
    components: {
      StarDetailDialog,
      StarsTable
    },
    name: "home-page",
    data () {
      return {
        stars: this.$store.state.stars
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home-page {
    h1 {
      text-align: center;
    }
    
    .loading {
      text-align: center;
    }
    
    .icon {
      position: fixed;
      right: 1vh;
      width: 7vh;
      height: 7vh;
      border-radius: 100%;
      box-shadow: 0 0 4px black;
      color: black;
      font-weight: bold;
  
      img {
        position: relative;
        display: block;
        width: 60%;
        left: 20%;
        top: 20%;
      }
    }
    
    .settings-icon {
      bottom: 1vh;
      background: rgba(218, 236, 119, 0.8);
    }
    
    .search-icon {
      bottom: 9vh;
      background: rgba(236, 124, 108, 0.8);
    }
  }
</style>
