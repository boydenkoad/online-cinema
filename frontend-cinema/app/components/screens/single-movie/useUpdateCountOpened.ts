import { useAuth } from "@/hooks/useAuth"
import { MovieService } from "@/services/movie.service"
import { useEffect } from "react"
import { useMutation } from "react-query"

export const useUpdateCountOpened=(slug:string)=>{
    const {user} = useAuth()
    
    const {mutateAsync} = useMutation(
        'update count opened',
        ()=>MovieService.updateCountOpened(slug)
    ) 

    useEffect(()=>{
        if(user){
            mutateAsync()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
}