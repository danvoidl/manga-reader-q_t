<template>
  <div class="relative grid self-center" >
    <input
      type="text"
      class="p-2 pl-8 h-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent w-64 lg:w-64 lg:bg-gray-200 lg:border-gray-200"
      placeholder="Search..."
      value=""
      v-model="mangaName"
      @keyup="callSearch()"
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
          <router-link @click="cleanSearch()" class="relative h-20 w-80 bg-gray-300 mt-1 mb-1 flex items-center cursor-pointer" :to="`/info/${result.data.id}`" replace>
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
</template>

<script>
export default {
  data(){
    return {
      showMenu: false,
      loadingResults: false,
      searchTimer: null,
      searchResults: [],
      mangaName: ''
    }
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
}
</script>

<style>

</style>