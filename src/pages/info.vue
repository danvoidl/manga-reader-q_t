<template>
  <div>
    <div class="h-80 z-20 filter blur-sm " >
      <q-parallax
      v-if="imgReady"                             
      :src="manga.cover"
      :speed="1"   
      class="bg-top"
      >                          
      </q-parallax> 
    </div>
    <section class="relative bg-main flex flex-col mt-22" v-if="imgReady">
    <div class="absolute left-6 -top-32 text-gray-900">
      <img v-if="imgReady" :src="manga.cover" class="h-96 max-w-  bg-main-secondary " alt="" />

      <!-- Manga Status -->
      <p
        v-if="manga.data.attributes.status == 'ongoing'"
        class="w-32 h-6 mt-3 bg-green-400 rounded-md text-center"
      >
        Status: {{ manga.data.attributes.status }}
      </p>
      <p v-else class="w-32 h-6 mt-3 bg-yellow-300 rounded-md text-center"></p>

      <!-- Typeof Reading -->
      <p class="w-32 h-6 mt-3 bg-green-400 rounded-md text-center">
        Type: {{ manga.data.type }}
      </p>
    </div>

    <div class="ml-80 text-gray-50 top-6">
      <p class="font-bold text-3xl mt-2">
        {{ manga.data.attributes.title.en }} 
      </p>
      <p class="mt-2 border border-b-2 border-main-secondary w-20"></p>
      <p class="mt-5 w-2/3">{{ manga.data.attributes.description.en.length > 600 ? `${manga.data.attributes.description.en.substring(0, 600)}...` : manga.data.attributes.description.en }}</p>

      <!-- GENRES -->
      <div class="flex mt-6 w-11/12 ">
        <p class="mr-4 text-center">Genres:</p>
        <div
          class="w-32 h-6 ml-2 mb-2 bg-gray-50 rounded-md text-black-main text-center"
          :key="genre.id"
          v-for="genre in genres"
        >
          {{ genre.attributes.name.en }}
        </div>
      </div>

      <!-- THEMES -->
      <div class="flex mt-3 w-11/12">
        <p class="mr-4 text-center">Themes:</p>
        <div
          class="w-32 h-6 ml-2 mb-2 bg-gray-50 rounded-md text-black-main text-center"
          :key="theme.id"
          v-for="theme in themes"
        >
          {{ theme.attributes.name.en }}
        </div>
      </div>
    </div>

    <div class="ml-6 mt-20">
      <p class="text-gray-50 mt-9">Chapters:</p>
      <ul>
        <li :key="chapter" v-for="chapter in chapters" class="text-main">
          <router-link :to="`/read/${manga.data.id}`">
            <div
              class="cursor-pointer bg-main-secondary mt-2 grid h-12 w-5/6"
              @click="read(chapter)"
            >
              <p class="ml-2 self-center">Capítulo: {{ chapter }}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {      
      genres: [],
      themes: [],
      chapters: [],     
      mangaId: this.$route.params.id,
      manga: {
        cover: ''
      },
      imgReady: false 
    };
  },
  methods: {
    filterGenres(obj){
      return obj.attributes.group === 'genre';
    },
    filterThemes(obj){
      return obj.attributes.group === 'theme';
    },
    filterChapters(obj){
      return obj != obj.none;
    },
    read(chapter){
      localStorage.setItem('chapterToRead', chapter);

      this.$store.dispatch('chapters/getMangaChapter', { sort: `?manga=${this.manga.data.id}&chapter=${chapter}&limit=1` }).then(() => {  
      })
    },  
    async getMangaInfo(){
      this.$store.dispatch('manga/getManga', { query: `/${this.mangaId}`}).then((resp) => {      
        let mangaData = resp;
        mangaData.relationships.filter((relation) => { 
          if(relation.type == 'cover_art') {           
            let payload = { coverId: relation.id, mangaId: this.mangaId };          
            this.$store.dispatch('manga/getCover', { data: payload }).then((resp) => {         
              mangaData.cover = resp;
            })    
          }
        }) 

        this.manga = mangaData;
        console.log('Manga to read', this.manga);

        this.genres = this.manga.data.attributes.tags.filter(this.filterGenres);
        this.themes = this.manga.data.attributes.tags.filter(this.filterThemes);

        setTimeout(() => {
          this.imgReady = true;
        },500)
      
      })  
    },
    async getChaptersInfo()  {
      this.$store.dispatch('manga/getMangaChapters', { sort: `/${this.mangaId}/aggregate` }).then(() => {
        let chapters = this.$store.state.manga.mangaChapters.volumes;

        console.log(chapters);
        for(let index in chapters){
          for(let index2 in chapters[index].chapters){
            if(chapters[index].chapters[index2].chapter != 'none') {
              this.chapters.push(parseFloat(chapters[index].chapters[index2].chapter))              
            }
          }
        }

        this.chapters = [...new Set(this.chapters)];

        this.chapters = this.chapters.sort((a,b) => {
            if(a > b) return 1;
            if(a < b) return -1;
            return 0;
          });
      })
    }
  },  
  async mounted(){                     
    await this.getMangaInfo();
    await this.getChaptersInfo();    
  },
  watch: {
    '$route.params.id'(n, o){
      document.location.reload()
    }
  }
};
</script>

<style></style>
