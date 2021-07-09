import api from '../../../API/api.js'

const endpoint = '/chapter'

export default {    
    async getMangaChapters({commit}, { sort }) {
        let resp = await api.get(endpoint + sort);                
        commit('setMangaChapters', resp);
        return resp;
    },
    async getLatestUpdates({commit, dispatch}, {sort}){
        let resp = await api.get(endpoint + sort);  
        
        let mangas = resp.results;  
                
        for (let index in mangas) {                                  
            let payload =  { coverId: mangas[index].relationships.filter((obj) => { if(obj.type == 'manga') return {...obj} }) }                        
            mangas[index].cover = await dispatch('getCover', { data: payload.coverId[0].id });
        }                                 
        
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
}