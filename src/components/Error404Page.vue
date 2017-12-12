<template>
  <div>
    <!-- Awwww yeah! -->
    <marquee><h1>404 - Page Not Found</h1></marquee>
    <p><router-link to="/" class="home">Go home!</router-link></p>
  </div>
</template>

<script>
  export default {
    name: "404-page"
  }
</script>

<style lang="scss" scoped>
  p {
    text-align: center;
    
    a {
      color: white;
    }
  }
</style>
