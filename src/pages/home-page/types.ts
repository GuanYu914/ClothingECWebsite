import { ExternalBSCarouselProps } from "../../components/bs-carousel"

export interface BannersStatePayload extends ExternalBSCarouselProps {
}

export interface BannerAPIRespPayload {
  id: number;
  src: string;
  link?: string;
  alt?: string;
}

export interface CategoriesStatePayload {
  id: number;
  name: string;
  img: string;
}

export interface CategoriesAPIRespPayload {
  id: number;
  name: string;
  src: string;
}

export interface HotItemsStatePayload {
  id: number;
  product: {
    name: string;
    price: string;
    img: string;
  };
  isLiked: boolean;
}

export interface HotItemsAPIRespPayload {
  id: number;
  name: string;
  price: string;
  imgs: string;
  isLiked: string;
}

export interface CommentsStatePayload {
  id: number;
  avatar: string;
  comment: string;
}

export interface CommentsAPIRespPayload {
  id: number;
  avatar: string;
  comment: string;
}