import { useAuth } from "@/hooks/useAuth"
import { UserService } from "@/services/user.service"
import { useQuery } from "react-query"

export const useFavorites=()=>{

    const {user} = useAuth()

    const {isLoading,data:favoriteMovies,refetch} = useQuery(
        'favorites movies',
        ()=>UserService.getFavorites(),{
            select:({data})=>data,
            enabled:!!user
        }
    )

    return {isLoading,favoriteMovies,refetch}
}