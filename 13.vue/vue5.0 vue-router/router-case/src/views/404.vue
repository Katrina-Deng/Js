<template>
  <div>
    <h3>Opps?! page not found~</h3>
    <router-link :to="{ name: 'home' }">
      <div class="backLink">Back to home</div>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
h3 {
  display: block;
  padding: 40px;
  font-size: 40px;
  color: #473c8b;
  letter-spacing: 2px;
  word-spacing: 3px;
}

.backLink {
  text-decoration: none; 
  padding: 10px 20px;
  width: 100px;
  height: 35px;
  margin: 0 auto;
  line-height: 35px;
  background: #E0FFFF;
  border-radius: 30px;
  box-shadow: 0 0 10px 0 #E6E6FA;
}
</style>
