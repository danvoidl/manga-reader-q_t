<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="no-shadow bg-gray-900">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Title
        </q-toolbar-title>
        
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-gray-900"
      
    >     
    <ul class="text-gray-50 ">    
    </ul>

    </q-drawer>

    <q-page-container>
      <router-view  />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,      
    }
  }
}
</script>

<style>


</style>
