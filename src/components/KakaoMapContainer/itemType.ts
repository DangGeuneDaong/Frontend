type keyValueType = {
  [key: string]: string;
}

export interface ItemType {
  goodId: number;
  title: string;
  mainCategory: string;
  subCategory: string;
  latitude: number;
  longitude: number;
  location: string;
  status: string;
  goodImages: string[];
}

export const StatusType: keyValueType = {
  'SHARING': '나눔중',
  'COMPLETE': '나눔완료'
};

export const CategoryType: keyValueType = {
  'FODDER': '사료',
  'SNACK': '간식',
  'SUPPLY': '용품',
  'CLOTHES': '의류'
};




