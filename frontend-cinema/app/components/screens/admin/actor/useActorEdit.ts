import { GenreService } from "@/services/genre.service";
import { getKeys } from "@/utils/object/getKeys";
import { toastError } from "@/utils/toast-error";
import { getAdminUrl } from "config/url.config";
import { useRouter } from "next/router";
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";
import { IActorEditInput } from "./actor-edit.interface";
import { ActorService } from "@/services/actor.service";

export const useActorEdit = (setValue:UseFormSetValue<IActorEditInput>)=>{
    const {push, query} = useRouter()

    const actorId = String(query.id)

    const {isLoading} = useQuery(['actor',actorId],()=>ActorService.getById(actorId),{

        onSuccess:({data})=>{

            getKeys(data).forEach(key=>{
                setValue(key,data[key])
            })

            setValue('name',data.name)
        }
        ,
        onError:(error)=>{
            toastError(error,'Get genre')
        },
        enabled:!!query.id
    })

    const {mutateAsync} = useMutation('update actor',(data:IActorEditInput)=>ActorService.update(actorId,data),{
        onError:(error)=>{
            toastError(error,'Update genre')
        },
        onSuccess:()=>{
            toastr.success('Update actor','update was successful')
            push(getAdminUrl('actors'))
        }
    })

    const onSubmit:SubmitHandler<IActorEditInput>= async(data)=>{
        await mutateAsync(data)
    }

    return {onSubmit, isLoading}
}