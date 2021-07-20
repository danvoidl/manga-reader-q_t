<template>  
  <div class="h-full w-full">
    <img :src="manga.cover" class="w-full h-full rounded-sm" alt="" />
    <span
      class="absolute top-0 right-0 w-12 h-16 rounded-sm bg-main-secondary grid place-items-center font-semibold"
      v-if="hasChapter"
    >
      <p>{{ manga.data.attributes.chapter }}</p>
      <img class="h-7" :src="`https://mangadex.org/flags/${manga.data.attributes.translatedLanguage == 'en' ? 'us' : manga.data.attributes.translatedLanguage}.svg`" alt="">
    </span>
    <div
      class="absolute bottom-0 w-full h-14 bg-main bg-opacity-90 rounded-sm grid place-items-center"
    >
      <span
        class="text-center text-gray-50 break-all overflow-hidden p-1 font-sans font-medium"
        v-if="hasChapter && manga.data.attributes.title != null"
      >
        {{
          manga.data.attributes.title.length > 30
            ? `${manga.data.attributes.title.substring(0, 30)}...`
            : manga.data.attributes.title
        }}
      </span>
      <span v-else-if='manga.data.attributes.title != null' class="text-center text-gray-50 break-all overflow-hidden p-1 font-sans font-medium">
        {{
          manga.data.attributes.title.en.length > 30
            ? `${manga.data.attributes.title.en.substring(0, 30)}...`
            : manga.data.attributes.title.en
        }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: { 
    manga: {
      type: Object,
      require: true,
    },
    hasChapter: {
      type: Boolean,
      require: true,      
    },  
  },
};
</script>

<style></style>
