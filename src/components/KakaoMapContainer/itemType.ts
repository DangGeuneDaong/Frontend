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
  'sharing': '나눔중',
  'shared': '나눔완료'
};

export const CategoryType: keyValueType = {
  'food': '사료',
  'snack': '간식',
  'supply': '용품'
};




