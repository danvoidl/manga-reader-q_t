<template>
  <div>
    <div class="m-auto w-11/12 h-82 bg-gray-900 mt-2 mb-4"></div>
    <!--Latest Updates-->
    <div class="w-11/12 m-auto mb-5 grid">
      <p class="text-gray-50 text-lg">Latest Updates</p>
      <p class="w-10 border-b-2 border-main-secondary"></p>
    </div>
    <section
      class="flex flex-nowrap h-73 gap-5 items-center shadow-inner overflow-auto w-11/12 m-auto last-updated"
      v-if="latestUpdates.length > 0"
    >
      <div
        class="cursor-pointer w-48 h-72 focus-within bg-green-50 rounded-md shadow-md-b relative flex-shrink-0 "
        :key="index"
        v-for="(manga, index) in latestUpdates"
        @click="readManga(manga)"
      >
        <manga-card
          :manga="manga"
          :hasChapter="true"
        />
      </div>
    </section>

    <section v-else class="h-80 w-full grid place-items-center">
      <q-spinner color="primary" size="3em" :thickness="2" />
    </section>

    <!-- More Readed -->
    <div class="w-11/12 m-auto mb-5 mt-10">
      <p class="text-gray-50 text-lg">Read now</p>
      <p class="w-10 border-b-2 border-main-secondary"></p>
    </div>
    <section
      class="grid grid-cols-1 w-11/12 m-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      v-if="moreReaded.length > 0"
    >
      <div
        class="w-48 h-72 bg-green-50 rounded-md shadow-md-b relative flex-shrink-0"
        :key="index"
        v-for="(manga, index) in moreReaded"
        @click="infoManga(manga)"
      >
        <manga-card
          :manga="manga"
          :hasChapter="false"
          :routePath="`/info/${manga.data.id}`"
        />
      </div>
    </section>
    <section v-else class="h-80 w-full grid place-items-center">
      <q-spinner color="primary" size="3em" :thickness="2" />
    </section>
  </div>
</template>

<script>
import mangaCard from "../components/mangaCard.vue";

export default {
  components: { mangaCard },
  data() {
    return {
      latestUpdates: [],
      cssInfo: "background-color: black; color: #41b883",
      chapter: "",
      moreReaded: []
    };
  },
  methods: {
    readManga(manga) {
      localStorage.setItem("chapterToRead", manga.data.attributes.chapter);
      localStorage.setItem('language', manga.data.attributes.translatedLanguage);

      this.$router.push({path: `/read/${manga.mangaId}`})
    },
    infoManga(manga){
      this.$router.push({path: `/info/${manga.data.id}`})
    }
  },
  mounted() {
    //More Readed
    this.$store.dispatch("manga/getMangaList", { query: "?limit=8&offset=0" })
    .then(() => {
      this.moreReaded = this.$store.state.manga.mangaList;
    });

    //Latest Updates
    this.$store.dispatch("chapters/getLatestUpdates", { sort: "?limit=12&order[publishAt]=desc" })
    .then(resp => {
      this.latestUpdates = resp;

      //forEach não funciona em operações assíncronas!
      for(let index in this.latestUpdates){
        if (this.latestUpdates[index].data.attributes.title == null) {                              
          this.$store.dispatch("manga/getManga", { query: `/${this.latestUpdates[index].mangaId}` })
          .then(resp => this.latestUpdates[index].data.attributes.title = resp.data.attributes.title.en)                                    
        }
      }
    });    
  }
};
</script>

<style>
.last-updated::-webkit-scrollbar {
  height: 5px;
}

.last-updated::-webkit-scrollbar-thumb {
  background: gray;
  height: 5px;
  border-radius: 3px;
}
</style>
