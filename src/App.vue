<template>
  <div id="app">
    <router-view/>
    <error-dialog v-if="error.unread"></error-dialog>
    <star-detail-dialog v-if="stars.selected" :star="stars.selected"></star-detail-dialog>
  </div>
</template>

<script>
  import ErrorDialog from "./components/ErrorDialog.vue"
  import StarDetailDialog from "./components/StarDetailDialog/index"
  import store from "./store"
  
  export default {
    name: "app",
    store,
    components: {
      StarDetailDialog,
      ErrorDialog
    },
    data () {
      return {
        stars: store.state.stars,
        error: store.state.error
      }
    }
  }
</script>

<style>
  #app {
    position: relative;
    font-family: "Raleway", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: white;
  }
  h1, h2, h3, h4, h5 {
    font-family: "Orbitron", sans-serif;
    font-weight: 400;
    color: white;
    text-shadow: 1px 1px 1px #b8ffff;
  }
  body, html {
    padding: 0;
    margin: 0;
  }
  body {
    background: url(assets/star-space-tile.png);
  }
  /* Some basic reset shenanigans */
  * {
    box-sizing: border-box;
  }
  button {
    background: none;
    border: none;
    font-size: 100%;
    color: inherit;
    padding: 0;
  }
  div {
    user-select: none;
  }
</style>
