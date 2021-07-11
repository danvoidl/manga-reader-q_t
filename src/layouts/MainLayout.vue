<template>
  <q-layout view="lHh Lpr lFf" class='bg-main' >
    <navbar :screenWidth="windowWidth"></navbar>   
    <q-page-container>
      <router-view name="main" />
    </q-page-container>
  </q-layout>
</template>

<script>
import Navbar from '../components/navbar.vue'

export default {
  name: 'MainLayout',
  components: { Navbar },
  data () {
    return {
      windowWidth: window.innerWidth,    
    }
  },
  mounted() {        
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
    };      
  },
  created(){
    if(this.$route.path == '/') this.$router.push({name: 'main' })
  }
}
</script>

<style>


</style>
