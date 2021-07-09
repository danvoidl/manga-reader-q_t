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
        let mangas = await API.get(endpoint + query );
        
        mangas = mangas.results;                  
        let payload = '?'

        for (let index in mangas) {
            let lastPosition = mangas[index].relationships.length - 1;            
            payload += `ids[]=${mangas[index].relationships[lastPosition].id}&`
            if(index == mangas.length - 1) payload += 'limit=12'
        }             
        
        let covers = await dispatch('getCovers', { query: payload });
        covers = covers.results

        for(let index in mangas){
            covers[index].relationships.filter((relation) => {
                if(relation.type == 'manga' ) {
                    mangas.filter((manga) => {
                        if(manga.data.id == relation.id) 
                            manga.cover = `https://uploads.mangadex.org/covers/${relation.id}/${covers[index].data.attributes.fileName}` 
                    })
                }
            })
        }
        
        console.log('Mangas home ',mangas);

        commit('setMangaList',  {data: mangas});
    },
    async getCover({commit}, { data }) {                  
        let resp = await API.get(`/cover/${data.coverId}`);
        return `https://uploads.mangadex.org/covers/${data.mangaId}/${resp.data.attributes.fileName}`;
    },
    async getCovers({commit}, { query }){        
        let resp = await API.get(`/cover${query}`);
        return resp
    },
    async getMangaChapters({commit}, { sort }){
        let resp = await API.get(endpoint + sort);                
        commit('setMangaChapters', resp)
    }
}