<template>
  <div>
    <!-- Most Viewed -->
    <section class="w-11/12 m-auto relative">
      <div class="m-auto mb-5 absolute rounded-md w-max p-2 mt-2 left-5">
        <p class="font-semi-bold text-gray-50 text-2xl">Most Viewed</p>
        <p class="w-10 border-b-2 border-main-secondary"></p>
      </div>

      <div
        class="bg-gray-900 w-full m-auto h-96 mb-6 bg-center bg-contain bg-no-repeat"
        :style="`background-image: url('${banner}')`"
      ></div>
    </section>

    <!--Latest Updates-->
    <div class="w-11/12 m-auto mb-5 grid">
      <p class="text-gray-50 text-2xl">Latest Updates</p>
      <p class="w-10 border-b-2 border-main-secondary"></p>
    </div>
    <section
      class="flex flex-nowrap h-96 gap-5 items-center shadow-inner overflow-auto w-11/12 m-auto last-updated"
      v-if="mangas.length > 0"
    >
      <div
        class="w-56 h-80 focus-within bg-green-50 rounded-md shadow-md-b relative flex-shrink-0"
        :key="index"
        v-for="(manga, index) in mangas"
        @click="readManga(manga)"
      >
        <manga-card
          :manga="manga"
          :hasChapter="true"
          :routePath="`/read/${manga.mangaId}/${manga.data.attributes.chapter}`"
        />
      </div>
    </section>

    <section v-else class="h-80 w-full grid place-items-center">
      <q-spinner color="primary" size="3em" :thickness="2" />
    </section>

    <!-- More Readed -->
    <div class="w-11/12 m-auto mb-5 mt-10">
      <p class="text-gray-50 text-2xl">Read now</p>
      <p class="w-10 border-b-2 border-main-secondary"></p>
    </div>
    <section
      class="grid  grid-cols-1 w-11/12 m-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      v-if="moreReaded.length > 0"
    >
      <div
        class="w-56 h-80 bg-green-50 rounded-md shadow-md-b relative flex-shrink-0"
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
import bnh from "../assets/BNH.jpeg";
import opm from "../assets/OPM.jpg";
import solo from "../assets/frame1.png";

import mangaCard from "../components/mangaCard.vue";

export default {
  name: "home",
  components: { mangaCard },
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
        console.log("MORE READED", this.moreReaded);
      });

    this.$store
      .dispatch("chapters/getLatestUpdates", {
        sort: "?limit=12&order[publishAt]=desc",
      })
      .then((resp) => {
        this.mangas = resp;

        this.mangas.map((manga) => {
          manga.mangaId = manga.relationships[1].id;
          if (manga.data.attributes.title == "") {
            this.$store
              .dispatch("manga/getManga", {
                query: `/${manga.relationships[1].id}`,
              })
              .then((resp) => {
                manga.data.attributes.title = resp.data.attributes.title.en;
              });
          }
        });

        console.log("MANGAS", this.mangas);
      });

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
  height: 5px;
}

.last-updated::-webkit-scrollbar-thumb {
  background: gray;
  height: 5px;
  border-radius: 3px;
}
</style>
