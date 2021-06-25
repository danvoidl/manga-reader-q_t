<template>

  <div>
      <section class="w-full relative mt-10">
      <div class="w-11/12 m-auto mb-5">
        <p class="font-semi-bold text-gray-50 text-2xl">Most Viewed</p>
        <p class="w-10 border-b-2 border-main-secondary"></p>
      </div>

      <div
        class="bg-gray-900 w-11/12 m-auto h-96 mb-6 bg-center bg-contain bg-no-repeat"
        :style="`background-image: url('${banner}')`"
      ></div>
      </section>

      <!--Latest Updates-->
      <div class="w-11/12 m-auto mb-5">
      <p class="font-bold text-gray-50 text-2xl">Latest Updates</p>
      <p class="w-10 border-b-2 border-main-secondary"></p>
      </div>
      <section
      class="flex flex-nowrap overflow-y-hidden overflow-scroll last-updated"
      v-if="mangas.length > 0"      
      >
      <div
        class="w-56 h-80 ml-14 bg-green-50 rounded-md filter drop-shadow-md relative flex-shrink-0"
        :key="index"
        v-for="(manga, index) in mangas"
        @click="readManga(manga)"
      >
        <router-link :to="`/read/${manga.mangaId}/${manga.data.attributes.chapter}`">
          <img :src="manga.cover" class="w-full h-full rounded-sm" alt="" />

          <span
            class="absolute top-0 right-0 w-12 h-8 rounded-sm bg-main-secondary grid place-items-center font-semibold"
          >
            {{ manga.data.attributes.chapter}}
          </span>

          <div
            class="absolute bottom-0 w-full h-14 bg-main bg-opacity-60 rounded-md grid place-items-center"
          >
            <span
              class="text-center text-gray-50 break-all overflow-hidden p-1 font-sans font-medium"
            >
              {{
                manga.data.attributes.title.length > 30
                  ? `${manga.data.attributes.title.substring(0, 30)}...`
                  : manga.data.attributes.title
              }}
            </span>            
          </div>
        </router-link>
      </div>
      </section>

      <section v-else class="h-80 w-full grid place-items-center">
        <div
          class="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-gray-50"
        ></div>
      </section>   

      <!-- More Readed --> 
      <div class="w-11/12 m-auto mb-5 mt-10">
      <p class="font-bold text-gray-50 text-2xl">More Readed</p>
      <p class="w-10 border-b-2 border-main-secondary"></p>
      </div>
      <section
      class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-4 "
      v-if="moreReaded.length > 0"      
      >
      <div
        class="w-56 h-80 bg-green-50 rounded-md shadow-md relative flex-shrink-0"
        :key="index"
        v-for="(manga, index) in moreReaded"
        @click="readManga(manga)"
      >
        <router-link :to="`/info/${manga.data.id}`">
          <img :src="manga.cover" class="w-full h-full rounded-sm" alt="" />

          <div
            class="absolute bottom-0 w-full h-14 bg-main opacity-95 rounded-sm grid place-items-center"
          >
            <span
              class="text-center text-gray-50 break-all overflow-hidden p-1 font-sans font-medium"
            >
              {{
                manga.data.attributes.title.en.length > 30
                  ? `${manga.data.attributes.title.en.substring(0, 30)}...`
                  : manga.data.attributes.title.en
              }}
            </span>            
          </div>
        </router-link>
      </div>
      </section> 
  </div>
</template>

<script>
import bnh from "../assets/BNH.jpeg";
import opm from "../assets/OPM.jpg";
import solo from "../assets/frame1.png";

export default {
  name: "home",
  data() {
    return {
      $q: {},
      mangas: [],
      cssInfo: "background-color: black; color: #41b883",
      chapter: "",
      bannerImages: [bnh, solo, opm],
      banner: "",
      count: 0,
      moreReaded: [],
    };
  },
  methods: {
    readManga(manga) {
      console.log("READ MANGA");
      console.log("YEAH");
      this.$store.dispatch("manga/readManga", manga);
    },
    replaceTitle(title) {
      return title.replace(/(\s)/g, "-");
    },

  },
  mounted() {
    this.$store
      .dispatch("manga/getMangaList", { query: "?limit=12&offset=0" })
      .then(() => {
        this.moreReaded = this.$store.state.manga.mangaList;
        console.log('MORE READED',this.moreReaded);
      });

    this.$store.dispatch('chapters/getLatestUpdates', {sort: '?limit=12&order[publishAt]=desc'}).then((resp) => {
      this.mangas = resp;
      

      this.mangas.map((manga) => {
        manga.mangaId = manga.relationships[1].id    
        if(manga.data.attributes.title == '') {
          this.$store.dispatch('manga/getManga', { query: `/${manga.relationships[1].id}`}).then((resp) => {
            manga.data.attributes.title = resp.data.attributes.title.en;
          })
        }
      })

      console.log('MANGAS', this.mangas);
    })

    setInterval(() => {
      let qtdImages = this.bannerImages.length - 1;

      this.count >= qtdImages ? (this.count = 0) : this.count++;

      this.banner = this.bannerImages[this.count];
    }, 5000);
  },
};
</script>

<style>
.last-updated::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  opacity: 0;
}
</style>
