<template>
  <div class="home-page">
    <h1>Welcome Starlord</h1>
    <stars-table></stars-table>
    <button class="settings-icon" title="Settings">
      <img src="../assets/settings.png" alt="Settings">
    </button>
  </div>
</template>

<script>
  import StarsTable from "./StarsTable"

  export default {
    components: {StarsTable},
    name: "home-page",
    data () {
      return {
        stars: this.$store.state.stars
      }
    },
    computed: {
      noStars: function () {
        return this.stars.results.length === 0
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
    .settings-icon {
      position: fixed;
      right: 1vh;
      bottom: 1vh;
      width: 50px;
      height: 50px;
      border-radius: 100%;
      background: rgba(218, 236, 119, 0.8);
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
  }
</style>
