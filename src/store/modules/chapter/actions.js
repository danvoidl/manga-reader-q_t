import api from '../../../API/api.js'

const endpoint = '/chapter'

export default {    
    async getMangaChapters({commit}, { sort }) {
        let resp = await api.get(endpoint + sort);                
        commit('setMangaChapters', resp);
        return resp;
    },
    async getLatestUpdates({ commit, dispatch }, { sort }){
        let resp = await api.get(endpoint + sort);  
        let mangas = resp.results;             
        let coverIds = '';

        mangas.forEach(manga => {
            manga.relationships.forEach(relation => {
                if(relation.type == 'manga') {
                    coverIds += `manga[]=${relation.id}&`
                    manga.mangaId = relation.id
                }                                                      
            })        
        });
        
        console.log(coverIds);
        let covers = await dispatch('getCovers', { query: coverIds });                        

        covers.forEach(cover => {
            cover.relationships.forEach(cover_relation => {
                if(cover_relation.type == 'manga'){
                    console.log(cover_relation)
                    mangas.forEach(manga => {
                        if(manga.mangaId == cover_relation.id){
                            manga.cover = `https://uploads.mangadex.org/covers/${cover_relation.id}/${cover.data.attributes.fileName}`                                                                                             
                            console.log('Sasageyo');
                        } 
                    })                                                                     
                }             
            })  
        })
        
        console.log('MANGAS',mangas);
        return mangas;
    },
    async getMangaChapter({commit}, { sort }){
        let url_images = 'https://uploads.mangadex.org';
        try {
            let resp = await api.get(endpoint + sort);            
            let chapter = resp.results[0];
                        
            let chapterImages = [];
    
            for (let index in chapter.data.attributes.data) {
                chapterImages.push(`${url_images}/data/${chapter.data.attributes.hash}/${chapter.data.attributes.data[index]}`);            
            }                         

            commit('setChapterImages', {data: chapterImages});       

        } catch (error) {
            return error;
        }
    },  
    async getCover({commit}, { data }) {                 
        let resp = await api.get(`/cover?manga[]=${data}`);               
        return `https://uploads.mangadex.org/covers/${data}/${resp.results[0].data.attributes.fileName}`;
    },     
    async getCovers({commit}, { query }){
        let resp = await api.get(`/cover?${query}limit=12`);    
       
        return resp.results
    }, 
}