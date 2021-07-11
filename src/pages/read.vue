<template>
  <div class="grid grid-cols-4 w-full h-screen" >
    <section v-if="mode == 'TB'" id="container_manga" class=" col-span-3 h-full bg-white overflow-scroll overflow-x-hidden">
      <img class="w-full mt-2 " :key='image' v-for="image in chapterImages" :src="image" alt="">
    </section>

    <section v-else id="container_manga" @keypress.left="passImage(-1)" @keypress.right="passImage(1)" class="col-span-3 h-full bg-white overflow-auto">      
        <img class="w-full"  :src="image" alt="">      
    </section>

    <section class="h-auto p-2 bg-main text-gray-50 border-t-2 ">
      <div class=" text-center font-semibold mt-3 flex flex-col items-center border-radius-2 " v-if="mangaInfo.data">
        <router-link class="hover:text-main-secondary" :to="`/info/${this.mangaId}`">
          {{ mangaInfo.data.attributes.title.en}} <br> 
        </router-link>
        <p class="font-extralight">Capítulo: {{ chapter }}</p> 
        <p class="border-b-2 border-main-secondary w-14 text-center mt-2 "></p>    
      </div>
      <div class="mt-4 text-sm"> 
        Reading Mode:
        <span>
          <button @click="readingMode('TB')" class="ring ring-white focus:ring-main-secondary focus-within:ring-main-secondary ring-opacity-80 ml-2 w-auto p-2 text-gray-50 rounded">Top > Bottom</button>
          <button @click="readingMode('LR')" class="ring ring-white focus:ring-main-secondary focus-within:ring-main-secondary ring-opacity-80 ml-2 w-auto p-2 text-gray-50 rounded">Left > Right</button>                
        </span>
      </div>
      <div class="mt-4 text-sm">
        Readind Status: 
        <span>
          {{ chapterCompleted ? 'Completed' : 'Keep reading'}}
        </span>
        <span class="block">
            <button @click="previousChapter()" class="bg-main-secondary text-main rounded-sm w-auto p-2 ml-2 mt-2">Previous Chapter</button>          
          <button @click='nextChapter()' class="bg-main-secondary text-main rounded-sm w-auto p-2 ml-2">Next Chapter</button>
        </span>
      </div>


    </section>

    <q-dialog v-model="endChapter">
      <q-card>
        <h1> End of chapter </h1>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return {
      image: '',
      chapterImages: [],
      mangaInfo: {},
      mangaId: this.$route.params.id,
      chapter: this.$route.params.cap,
      mode: 'TB',
      imagePosition: 0,
      endChapter: false,
      chapterCompleted: false,
      chapters: []
    }
  },
  created(){
    console.log(this.$route.params.id, this.$route.params.cap);
  },
  mounted() {    
    this.$store.dispatch('manga/getManga', {query: `/${this.$route.params.id}`}).then((resp) => {
      this.mangaInfo = resp
      console.log('mangaInfo',this.mangaInfo);
    })
    this.$store.dispatch('chapters/getMangaChapter', { sort: `?manga=${this.mangaId}&chapter=${this.chapter}&limit=1` }).then(() => {      
      this.chapterImages = this.$store.state.chapters.chapterImages;             
    }); 
    this.getChaptersInfo();          
  },
  methods: {    
    nextChapter(){ 
      let index = this.chapters.findIndex(element => element == parseFloat(this.chapter))
      index = this.chapters[index + 1]
      this.$route.params.cap = index.toString()
    },
    previousChapter(){
      let index =  this.chapters.findIndex(element => element == parseFloat(this.chapter))
      index = this.chapters[index - 1]
      this.$route.params.cap = index.toString()
    },
    readingMode(way){
      this.mode = way;
      if(this.mode == 'LR') {
        this.image = this.chapterImages[this.imagePosition];                
        document.addEventListener('keydown', (event) => {          
          if(event.code == 'ArrowRight' && this.imagePosition < this.chapterImages.length - 1) this.imagePosition++;      
          if(event.code == 'ArrowLeft' && this.imagePosition > 0) this.imagePosition--;      
          if(this.chapterImages.length - 1 >= this.imagePosition) this.chapterCompleted = true                                  
          this.image = this.chapterImages[this.imagePosition];    
                      
        })
      }
    },
    passImage(number){
      console.log(this.imagePosition);
      this.imagePosition + number;
      this.image = this.chapterImages[this.imagePosition]
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

        console.log(this.chapters);
      })
    }
  },
  watch:{
    '$route.params.cap'(n, o){
      document.location.reload()
    }
  }
}
</script>

<style>

#container_manga::-webkit-scrollbar{
  width: 8px;
  height: 5px;
  padding: 1px;
}

#container_manga::-webkit-scrollbar-track {  
  background: rgba(148, 148, 148, 0.8);  
}

/* Handle */
#container_manga::-webkit-scrollbar-thumb {
  background: rgb(56, 56, 56);
  border-radius: 10px;
}
</style>