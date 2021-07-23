<template>
  <nav class="relative w-full h-16 font-sans min-w-full bg-main z-10 drop-shadow-md">
    <div class="w-11/12 flex justify-between items-center m-auto" v-if="screenWidth >= 900">
      <!--LOGO -->
      <span class="h-16 grid">
        <img
          class="h-12 self-center"
          src="../assets/logo.png"
          alt=""
        />        
      </span>      

      <!--OPTIONS -->
      <div class=" flex items-center h-16">
        <search-bar/>

        <div v-if='navOptions.length > 0' >
          <ul class="flex text-gray-50 ">
            <router-link class="flex items-center cursor-pointer border-b border-transparent hover:border-b-2 hover:border-yellow-400 m-6" :to='{name: option.route}' :key="option.name" v-for="option in navOptions">
              <li > {{option.name}} </li>            
            </router-link>
          </ul>
        </div>

        <!-- search -->
              
      </div>
    </div>

    <div v-else class="w-4.5/5 flex justify-between m-auto">
      <!--LOGO -->
      <span class="h-16 grid">
        <img
          class="h-12 ml-10 self-center"
          src="../assets/logo.png"
          alt=""
        />
      </span>

      <div class="h-16 w-auto flex relative">
        <search-bar/>

        <svg
          @click="showMenu = !showMenu"
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="white"
          class="bi bi-list self-center mr-10 ml-4 cursor-pointer"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>

        <div
          v-if="showMenu"
          class="absolute top-14 right-12 w-56 h-36 bg-gray-600 rounded grid"
        >
          <ul class="flex flex-col align-middle m-auto self-center">
            <li
              class="text-gray-50 mt-2 font-semibold text-sm grid self-center cursor-pointer"
              :key="option.name"
              v-for="option in navOptions"
            >
              {{ option.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>

</template>

<script>
import searchBar from './searchBar.vue'
export default {
  props: {
    screenWidth: Number,
  },
  components: {
    searchBar,
  },
  data() {
    return {
      navOptions: [
        {
          name: "Home", 
          route: 'main'         
        },
        {
          name: "Mangas",
          route: '', 
        },
        {
          name: "Latest",
          route: ''
        },
        {
          name: 'Top voted',
          route: ''
        },
      ],
      showMenu: false,
      loadingResults: false,
      searchTimer: null,
      searchResults: [],
      mangaName: ''
    };
  },
  methods: {    
    cleanSearch(){
      this.mangaName = ''
      this.loadingResults = false
      this.searchResults = []
    },
    closeResults(){
      this.loadingResults = false
      this.searchResults = []
    },
    callSearch(event){            
      clearTimeout(this.searchTimer)

      this.searchTimer = setTimeout(() => {
        if(this.mangaName.length > 0){
          this.searchFor()
        }
      }, 500)
    },
    async searchFor() {      
      this.$store.dispatch('manga/getManga', {query: `?title=${this.mangaName}`}).then((resp) => {
        let results = resp.results;
        
        results.filter((result) => {          
          this.$store.dispatch('manga/getCover', { data: {mangaId: result.data.id, coverId: result.relationships[result.relationships.length - 1].id}}).then((resp) => {
            result.cover = resp;
          })  
        })
        
        setTimeout(() => {
          this.searchResults = results;
          this.loadingResults = true;
          console.log('Search Results', this.searchResults);
        }, 500)
      })            
    },    
  },  
  watch: {
  }
};
</script>

<style scoped>
</style>