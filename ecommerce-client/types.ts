export interface BillboardType {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  billboard: BillboardType;
}

export interface ProductType {
  id: string;
  category: Category;
  name: string;
  price: number;
  size: Size;
  color: Color;
  images: ImageType[];
  description: string;
  quantity: number;
}

export interface Color extends Size {}

export interface ImageType {
  id: string;
  url: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}
