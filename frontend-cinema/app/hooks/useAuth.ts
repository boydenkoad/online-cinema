import { useAppSelector } from "./useTypeSelector";

export const useAuth = ()=>useAppSelector(state=>state.user)