<template>
  <div class="grid w-full">
    <section class="w-11/12 h-auto p-2 m-auto text-gray-50 border-t-2 ">
      <!-- Title/Chapters -->
      <div class="flex justify-around items-center">
        <button
          @click="previousChapter()"
          class="max-h-9 bg-main-secondary text-main rounded-sm w-auto p-2 ml-2"
        >
          Previous Chapter
        </button>

        <div
          class=" text-center font-semibold mt-3 flex flex-col items-center border-radius-2 "
          v-if="mangaInfo.data"
        >
          <router-link
            class="hover:text-main-secondary"
            :to="`/info/${this.mangaId}`"
          >
            {{ mangaInfo.data.attributes.title.en }} <br />
          </router-link>
          <p class="font-extralight">Chapter: {{ this.chapter }}</p>
          <p
            class="border-b-2 border-main-secondary w-14 text-center mt-2 "
          ></p>
        </div>

        <button
          @click="nextChapter()"
          class="max-h-9 bg-main-secondary text-main rounded-sm w-auto p-2 ml-2"
        >
          Next Chapter
        </button>
      </div>
    </section>

    <!-- Reading Mode -->
    <div class="fixed -bottom-24  hover:-translate-y-24  left-2/4 transform -translate-x-1/2 p-5 mt-4 border-t-4 border-main-secondary text-center text-sm rounded-md text-gray-50 bg-main">
      <p class="mb-4">Reading Mode</p> 
      <span>
        <button
          @click="readingMode('TB')"
          class="ring ring-white focus:ring-main-secondary focus-within:ring-main-secondary ring-opacity-80 ml-2 w-auto p-2 text-gray-50 rounded"
        >
          Top > Bottom
        </button>
        <button
          @click="readingMode('LR')"
          class="ring ring-white focus:ring-main-secondary focus-within:ring-main-secondary ring-opacity-80 ml-2 w-auto p-2 text-gray-50 rounded"
        >
          Left > Right
        </button>
      </span>
    </div>

    <section
      v-if="mode == 'TB'"
      id="container_manga"
      class="bg-main h-full"
    >
      <img
        class="max-w-3xl m-auto w-full mt-2 "
        :key="image"
        v-for="image in chapterImages"
        :src="image"
        alt=""
      />
    </section>

    <section
      v-else
      id="container_manga"
      @keypress.left="passImage(-1)"
      @keypress.right="passImage(1)"
      class="h-full bg-main m-auto overflow-auto"
    >
      <img class="max-w-3xl " :src="image" alt="" />
    </section>

    <q-dialog v-model="endChapter">
      <q-card>
        <h1>End of chapter</h1>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: "",
      chapterImages: [],
      mangaInfo: {},
      mangaId: this.$route.params.id,
      chapter: localStorage.getItem("chapterToRead"),
      mode: "TB",
      imagePosition: 0,
      endChapter: false,
      chapterCompleted: false,
      chapters: []
    };
  },
  mounted() {
    this.$store
      .dispatch("manga/getManga", { query: `/${this.$route.params.id}` })
      .then(resp => {
        this.mangaInfo = resp;
        console.log("mangaInfo", this.mangaInfo);
      });
    this.$store
      .dispatch("chapters/getMangaChapter", {
        sort: `?manga=${this.mangaId}&chapter=${this.chapter}&limit=1`
      })
      .then(() => {
        this.chapterImages = this.$store.state.chapters.chapterImages;
      });
    this.getChaptersInfo();
  },
  methods: {
    nextChapter() {
      let index = this.chapters.findIndex(
        element => element == parseFloat(this.chapter)
      );
      index = this.chapters[index + 1];
      this.chapter = index;
    },
    previousChapter() {
      let index = this.chapters.findIndex(
        element => element == parseFloat(this.chapter)
      );
      index = this.chapters[index - 1];
      this.chapter = index;
    },
    readingMode(way) {
      this.mode = way;
      if (this.mode == "LR") {
        this.image = this.chapterImages[this.imagePosition];

        document.addEventListener("keydown", event => {
          if (
            event.code == "ArrowRight" &&
            this.imagePosition < this.chapterImages.length - 1
          ) {
            scroll(0, 0)
            this.imagePosition++;
          }
          if (event.code == "ArrowLeft" && this.imagePosition > 0) {
            this.imagePosition--;
            scroll(0, 0)
          }
          if (this.chapterImages.length - 1 >= this.imagePosition) {
            this.chapterCompleted = true;
          }

          this.image = this.chapterImages[this.imagePosition];
        });
      }
    },
    passImage(number) {
      console.log(this.imagePosition);
      this.imagePosition + number;
      this.image = this.chapterImages[this.imagePosition];
    },
    async getChaptersInfo() {
      this.$store
        .dispatch("manga/getMangaChapters", {
          sort: `/${this.mangaId}/aggregate`
        })
        .then(() => {
          let chapters = this.$store.state.manga.mangaChapters.volumes;

          console.log(chapters);
          for (let index in chapters) {
            for (let index2 in chapters[index].chapters) {
              if (chapters[index].chapters[index2].chapter != "none") {
                this.chapters.push(
                  parseFloat(chapters[index].chapters[index2].chapter)
                );
              }
            }
          }

          this.chapters = [...new Set(this.chapters)];

          this.chapters = this.chapters.sort((a, b) => {
            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
          });
        });
    }
  },
  watch: {
    chapter() {
      localStorage.removeItem("chapterToRead");
      localStorage.setItem("chapterToRead", this.chapter);
      document.location.reload();
    }
  }
};
</script>

<style>
#container_manga::-webkit-scrollbar {
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
