import { IGalleryItem } from "ui/gallery/gallery.interface";
import { ISlide } from "ui/slider/slider.types";


export interface IHome{
    slides:ISlide[]
    trendingMovies:IGalleryItem[]
    actors:IGalleryItem[]
}
