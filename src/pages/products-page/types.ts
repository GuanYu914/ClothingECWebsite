export interface ProductsInfoStatePayload {
  categoryPath: {
    base: string;
    main?: string;
    sub?: string;
    detailed?: string
  };
  categoriesList: {
    id: number;
    name: string;
    category: {
      id: number;
      name: string;
      category: string[]
    }[];
    isSelected: boolean
  }[];
  productsList: {
    id: number;
    product: {
      name: string;
      price: string;
      img: string;
    };
    isLiked: boolean
  }[];
  totalProductsNumber: number;
}

export interface CategoriesInfoAPIRespPayload {
  id: number;
  name: string;
  category: string;
}

export interface ProductsByCategoryInfoAPIRespPayload {
  id: number;
  name: string;
  price: number;
  imgs: string;
}

export interface UseParamsHookPayload {
  mainCategoryFromRouter: string;
  subCategoryFromRouter: string;
  detailedCategoryFromRouter: string;
}