import API from '../../../API/api.js'

const endpoint = '/manga'

export default {
    async getManga({commit}, { query }){
        let resp = await API.get(endpoint + query);        
        return resp;
    },
    readManga({commit}, manga){                
        commit('setMangaToRead', manga);
    },
    async getMangaList({commit, dispatch}, { query }) {
        let resp = await API.get(endpoint + query );
        
        let mangas = resp.results;                  
                      
        for (let index in mangas) {
            let lastPosition = mangas[index].relationships.length - 1;
            let payload =  {coverId: mangas[index].relationships[lastPosition].id, mangaId: mangas[index].data.id}
            mangas[index].cover = await dispatch('getCover', { data: payload });
        }                     

        commit('setMangaList',  {data: mangas});
    },
    async getCover({commit}, { data }) {          
        let resp = await API.get(`/cover/${data.coverId}`)        
        return `https://uploads.mangadex.org/covers/${data.mangaId}/${resp.data.attributes.fileName}`;
    },
    async getMangaChapters({commit}, { sort }){
        let resp = await API.get(endpoint + sort);                
        commit('setMangaChapters', resp)
    }
}