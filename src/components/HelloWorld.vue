<template>
  <div>
  <v-app color="indigo">
     <v-content>
      <section>
        <v-parallax src="../assets/images/cubes.jpeg" height="600">
          <v-layout column align-center justify-center class="green--text">
            <img src="../assets/images/OsbornLogo.png" alt="Vuetify.js" height="200">
            <v-btn class="blue lighten-2 mt-5" dark large to="/login">
              Get Started
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>
    </v-content>
</v-app>
  </div>
</template>

<script>

  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },//DATA
    created(){

    },
    computed:{

    },//COMPUTED
    methods:{


    },//METHODS
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
