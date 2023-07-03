type keyValueType = {
  [key: string]: string;
}

export interface ItemType {
  id: number;
  title: string;
  main_category: string;
  category: string;
  latitude: number;
  longitude: number;
  address: string;
  status: string;
  good_image_list: string[];
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




