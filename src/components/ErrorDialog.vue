<template>
  <div class="error-dialog">
    <h2>ERROR</h2>
    <p>{{message}}</p>
    <button class="close" @click="dismiss">[x]</button>
  </div>
</template>

<script>
  export default {
    name: "error-dialog",
    data () {
      return {
        message: this.$store.state.error.message
      }
    },
    methods: {
      dismiss () {
        this.$store.dispatch("dismissError")
      }
    }
  }
</script>

<style lang="scss" scoped>
  .error-dialog {
    position: fixed;
    bottom: 5%;
    left: 5%;
    width: 90%;
    padding: 0 1em;
    background: #ff00008f;
    border-radius: 1em;
    
    .close {
      position: absolute;
      right: 1em;
      top: 1em;
      font-weight: bold;
    }
  }
</style>
