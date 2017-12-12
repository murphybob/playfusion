<template>
  <div class="settings-page">
    <h1 class="title">Settings</h1>
    <form class="settings">
      <fieldset>
        <legend>Results settings</legend>
        <label>
          Show stars with at least
          <input type="number" min="0" max="10" @change="changeShowWithAtLeastPlanets" :value="showWithAtLeastPlanets">
          exoplanets.
        </label>
      </fieldset>
    </form>
    <h2 class="back"><router-link to="/">⬅ Back</router-link></h2>
  </div>
</template>

<script>
  export default {
    name: "settings-page",
    data () {
      return {
        showWithAtLeastPlanets: this.$store.state.stars.showWithAtLeastPlanets
      }
    },
    methods: {
      changeShowWithAtLeastPlanets: function (ev) {
        const v = parseInt(ev.currentTarget.value, 10)
        this.$store.dispatch("changeShowWithAtLeastPlanets", v)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    text-align: center;
  }
  .settings {
    input {
      vertical-align: middle;
      tranform: scale(1.2)
    }
    button {
      margin: 1em 0 0;
      padding: 1em;
      background: green;
    }
  }
  .back {
    text-align: center;
    a {
      color: inherit;
      text-decoration: none;
    }
  }
</style>
