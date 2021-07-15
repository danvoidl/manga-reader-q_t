<template>
  <div>
    <!--  -->
    <div class="m-auto w-11/12 h-82 bg-gray-900 mt-2 mb-4"></div>
    <!--Latest Updates-->
    <div class="w-11/12 m-auto mb-5 grid">
      <p class="text-gray-50 text-lg">Latest Updates</p>
      <p class="w-10 border-b-2 border-main-secondary"></p>
    </div>
    <section
      class="flex flex-nowrap h-73 gap-5 items-center shadow-inner overflow-auto w-11/12 m-auto last-updated"
      v-if="mangas.length > 0"
    >
      <div
        class="w-48 h-72 focus-within bg-green-50 rounded-md shadow-md-b relative flex-shrink-0 "
        :key="index"
        v-for="(manga, index) in mangas"
        @click="readManga(manga)"
      >
        <manga-card
          :manga="manga"
          :hasChapter="true"
          :routePath="`/read/${manga.mangaId}`"
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
        @click="readManga(manga)"
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
  name: "home",
  components: { mangaCard },
  data() {
    return {
      mangas: [],
      cssInfo: "background-color: black; color: #41b883",
      chapter: "",
      moreReaded: [],
    };
  },
  methods: {
    readManga(manga) {
      localStorage.setItem('chapterToRead', manga.data.attributes.chapter)
      this.$store.dispatch("manga/readManga", manga);
    },
    replaceTitle(title) {
      return title.replace(/(\s)/g, "-");
    },
  },
  mounted() {
    this.$store.dispatch("manga/getMangaList", { query: "?limit=8&offset=0" }).then(() => {
        this.moreReaded = this.$store.state.manga.mangaList;
        console.log("MORE READED", this.moreReaded);
      });

    this.$store.dispatch("chapters/getLatestUpdates", {sort: "?limit=12&order[publishAt]=desc" }).then((resp) => {
        this.mangas = resp;

        this.mangas.map((manga) => {          
          if (manga.data.attributes.title == null) {
            this.$store.dispatch("manga/getManga", {query: `/${manga.relationships[1].id}`,})
              .then((resp) => {
                manga.data.attributes.title = resp.data.attributes.title.en;
              });
          }
        });
        console.log("LATEST UPDATES", this.mangas);
    });

    
  },
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
