<template>
  <div class="grid grid-cols-3 w-full h-screen" >
    <section id="container_manga" class=" col-span-2 h-full  overflow-scroll overflow-x-hidden">
      <img class="w-full " :key='image' v-for="image in chapterImages" :src="image" alt="">
    </section>

    <section class="h-auto p-2 bg-main text-gray-50 border-t-2 ">
      <div class="text-center font-semibold mt-3 flex flex-col items-center border-radius-2 " v-if="mangaInfo.data">
        {{ mangaInfo.data.attributes.title.en}} <br> <p class="font-extralight">Capítulo: {{ chapter }}</p> 
        <p class="border-b-2 border-main-secondary w-14 text-center mt-2 "></p>    
      </div>
      <div class="mt-4 text-sm"> 
        Reading Mode:
        <span>
          <button class="ring ring-main-secondary ring-opacity-80 ml-2 w-auto p-2 text-gray-50 rounded">Roll</button>
          <button class="ring ring-main-secondary ring-opacity-80 ml-2 w-auto p-2 text-gray-50 rounded">Pass pages</button>                
        </span>
      </div>
      <div class="mt-4 text-sm">
        Readind Status: 
        <span>
          
        </span>
      </div>


    </section>
  </div>
</template>

<script>
export default {
  data(){
    return {
      chapterImages: [],
      mangaInfo: {},
      mangaId: this.$route.params.id,
      chapter: this.$route.params.cap,
    }
  },
  created(){
    console.log(this.$route.params.id, this.$route.params.cap);
  },
  mounted() {    
    this.$store.dispatch('chapters/getMangaChapter', { sort: `?manga=${this.mangaId}&chapter=${this.chapter}&limit=1` }).then(() => {      
      this.chapterImages = this.$store.state.chapters.chapterImages;
      this.mangaInfo = this.$store.state.manga.mangaToRead;          
    });           
  },
  methods: {    
  }
}
</script>

<style>

#container_manga::-webkit-scrollbar{
  width: 11px;
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