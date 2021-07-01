<template>
  <nav class="relative w-full h-16 font-sans min-w-full bg-main z-10 drop-shadow-md">
    <div class="w-11/12 flex justify-between items-center m-auto" v-if="screenWidth >= 900">
      <!--LOGO -->
      <span class="h-16 grid">
        <img
          class="h-12 self-center"
          src="data:image/png;base64,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"
          alt=""
        />        
      </span>      

      <!--OPTIONS -->
      <div class=" flex items-center h-16">
        <div class="relative grid self-center" >
          <input
            type="text"
            class="p-2 pl-8 h-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent w-64 lg:w-64 lg:bg-gray-200 lg:border-gray-200"
            placeholder="Search..."
            value=""
            @keyup="callSearch($event)"
          />
          <span v-if="loadingResults" class="material-icons w-4 h-4 absolute left-2.5 top-2 lg:text-black cursor-pointer" @click="closeResults()">
            close
          </span>
          <svg
            v-else
            class="w-4 h-4 absolute left-2.5 top-2 lg:text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <div v-if="loadingResults">
            <div class=" h-auto max-h-96 overflow-auto w-82 bg-main absolute left-0 -bottom-auto mt-2 rounded-sm">
              <div class="" :key='result.data.id' v-for="result in searchResults">
                <router-link class="relative h-20 w-80 bg-gray-300 mt-1 mb-1 flex items-center cursor-pointer" :to="`/info/${result.data.id}`" replace>
                  <div class="h-full w-16 place-self-start bg-gray-800" >
                    <img :src="result.cover" class="h-20 w-16" alt="">
                  </div>
                  <p class="font-light w-64 text-center">                  
                    {{result.data.attributes.title.en }}            
                  </p>
                </router-link>
              </div>                            
            </div>
          </div>
        </div>  

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
      <span class="h-20 grid">
        <img
          class="h-12 ml-10 self-center"
          src="data:image/png;base64,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"
          alt=""
        />
      </span>

      <span class="h-20 w-auto grid relative">
        <svg
          @click="showMenu = !showMenu"
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="white"
          class="bi bi-list self-center mr-10 cursor-pointer"
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
      </span>
    </div>
  </nav>

</template>

<script>

export default {
  props: {
    screenWidth: Number,
  },
  data() {
    return {
      navOptions: [
        {
          name: "Home", 
          route: 'home'         
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
      searchResults: []
    };
  },
  methods: {    
    closeResults(){
      this.loadingResults = false
      this.searchResults = []
    },
    callSearch(event){            
      clearTimeout(this.searchTimer)

      this.searchTimer = setTimeout(() => {
        if(event.target.value.length > 0){
          this.search(event.target.value)
        }
      }, 500)
    },
    async search(mangaName) {      
      this.$store.dispatch('manga/getManga', {query: `?title=${mangaName}`}).then((resp) => {
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