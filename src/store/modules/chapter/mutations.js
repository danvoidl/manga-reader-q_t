export default {
    setMangaChapters(state,  {data}){        
        state.mangaChapters = data;        
    },
    setMangaChapter(state, {data}){
        state.mangaChapter = data
    },
    setChapterImages(state, {data}){
        state.chapterImages = data
    }
}