import { IGenre } from "@/shared/types/movie.types";
import { IUser } from "@/shared/types/user.types";

export interface IUserEditInput extends Omit<IUser, '_id'>{}