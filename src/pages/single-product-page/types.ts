import { ExternalBSCarouselProps } from "../../components/bs-carousel"

export interface ProductStatePayload {
  id: number;
  category: {
    base: string;
    main: string;
    sub: string;
    detailed: string;
  };
  name: string;
  detail: {
    size: string;
    shipment: string;
    cleanness: string;
  };
  imgs: {
    id: number;
    src: string;
    alt: string;
  }[];
  picker: {
    sizes: {
      id: number;
      name: string;
      selected: boolean;
    }[];
    colors: {
      id: number;
      hexcode: string;
      selected: boolean;
    }[];
    quantity: number;
    unitPrice: number;
  };
  isLiked: boolean;
}

export interface ProductByIdAPIRespPayload {
  pid: number;
  category: string;
  name: string;
  detail: string;
  imgs: string;
  colors: string;
  sizes: string;
  price: number;
}

export interface SizesOfProductByIdAPIRespPayload {
  id: number;
  name: string;
}

export interface ColorsOfProductByIdAPIRespPayload {
  id: number;
  hexcode: string;
}

export interface UseParamsHookPayload {
  productID: string
}

export interface ProductSlidesStatePayload extends ExternalBSCarouselProps {

}