<template>
  <div>
    <h1></h1>
    
    <router-link class='router-link' to="/repayments">Repayments</router-link>
    <router-link class='router-link' to="/compare">Compare Loans</router-link>
    <router-link class='router-link' to="/income">Income</router-link>

  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}





</style>
