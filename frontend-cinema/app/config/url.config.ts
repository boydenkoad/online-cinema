export const getActorUrl = (slug:string)=>`/actor/${slug}`
export const getMovieUrl = (slug:string)=>`/movie/${slug}`
export const getGenreUrl = (slug:string)=>`/genre/${slug}`


export const getAdminUrl = (url:string)=>`/menage/${url}`
export const getAdminHomeUrl=()=>getAdminUrl('').slice(0,-1)