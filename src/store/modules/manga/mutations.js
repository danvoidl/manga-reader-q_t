export default {
    setMangaList(state,  {data}){        
        state.mangaList = data;        
    },
    setMangaToRead(state, data){             
        state.mangaToRead = data;
    },
    setMangaChapters(state, data){
        state.mangaChapters = data;
    }    
}