export interface ItemType {
  id: string;
  location: string;
  category: string;
  latitude: number;
  longitude: number;
  title: string;
  address: string;
}

export const CategoryType = {
  food: '사료',
  snack: '간식',
  supply: '용품'
};