<template>
  <div id="app">
    <div class="phone-viewport">
      <md-toolbar>
        <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
          <md-icon>menu</md-icon>
        </md-button>

        <h2 class="md-title">{{appTitle}}</h2>
      </md-toolbar>

      <md-sidenav class="md-left md-sidenav" ref="leftSidenav" @click.native="toggleLeftSidenav">
        <md-toolbar class="md-medium">
          <div class="md-toolbar-container">
            <router-link to="/" class="white">  
            <md-button class="md-icon-button">
                <md-icon>home</md-icon>
            </md-button> 
            </router-link>
            <h3 class="md-title">Choosa a Calculator</h3>
          </div>
        </md-toolbar>
        <br/>
        <router-link class='router-link' to="/repayments">Repayments</router-link>
        <router-link class='router-link' to="/compare">Compare Loans</router-link>
        <router-link class='router-link' to="/income">Income</router-link>
        <router-link class='router-link' to="/contacts">Contacts (testing)</router-link>

      </md-sidenav>
      </div>
      <router-view class="router-view"></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
  methods: {
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    }
  },
  computed: {
    appTitle: function(){
        return window.appTitle;
    }
  }
}

window.appTitle = "Calculators"


</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
/*
a:hover{
  text-decoration: none!important;
}*/

.router-view{
  margin:30px;
}

.router-link {
  display: block;
  padding:13px;
  padding-left:25px;
  font-size:16px;
  color: #2E2E2E!important;
}

.router-link:hover {
  text-decoration: none!important;
  background-color: #D8D8D8;
}


.md-sidenav {
  text-align: left;
}

.white{
    color:white!important;
}


.correct, .green{
    color:green;
}
.incorrect, .red{
    color: #FA5858;
}

.pull-left{
    float:left!important;
}

.grey{
    color:grey;
}

.light-grey{
    color: lightgrey;
}

</style>
