# DangGeuneDaong

![DangGeuneDaong](https://github.com/DangGeuneDaong/Frontend/assets/110911811/9f3145c2-9698-434c-9866-ac6b2f9278e8)

## 개발 기간

2023.05.25 - 2023.07.06 (6주)

## 기획 배경

1인 가구의 증가와 고령화 등의 사회 변화로 인해, 반려동물과 함께하는 가구가 증가하고 있습니다. 이에 따라 반려동물 시장은 계속해서 성장하는 추세에 있습니다.

한국소비자원(Korea Consumer Agency)의 ‘반려동물 사료 유통 및 표시 실태조사’ 조사보고서(2021)에 따르면, (치료비를 제외한) 반려동물 양육비로 식비가 51.2%(사료비 33.4% + 간식비 17.8%)로 가장 큰 비중을 차지하고 있으며, 일용품이 11.1%로 그 뒤를 잇고 있습니다.

그러나 반려동물의 기호성에 따라 사용되지 않는 펫 용품이 많이 생기기도 합니다.<br/>
웹 서비스 '댕근이다옹'은 이러한 문제를 해결하기 위해 고안되었습니다.

## 해결 컨셉

- ‘시장의 확대’와 ‘무분별한 구매 및 낭비’ 사이에서 발생하는 한계를 해결하기 위해 반려동물 중고 물품 거래 및 나눔 플랫폼을 고안했습니다.
  - 식품에 국한하지 않고, 다양한 반려동물 중고 물품을 거래할 수 있도록 보편적인 플랫폼으로 설정했습니다.

## 기대효과

- 해당 서비스를 통해 반려동물 제품에 대한 무분별한 구매 및 낭비가 줄어들 것으로 기대됩니다.
- 해당 서비스를 통해 반려동물을 효과적으로 관리할 수 있는 노하우를 공유하여 반려동물 생태계의 긍정적인 문화를 형성할 것으로 생각합니다.

<br/>

# 프로젝트 소개

## 서비스 아키텍쳐

<img width="710" alt="project architecture" src="https://github.com/DangGeuneDaong/Frontend/assets/73399004/9c685314-82d8-41e5-ab30-f47d5502d7db">

## ERD

![erd](https://github.com/DangGeuneDaong/Frontend/assets/110911811/ee4fb893-f2dd-426f-873f-463574780d1e)

## 주요 개발 스택

| Category | Package Name      | Version   | Remarks                      |
| -------- | ----------------- | --------- | ---------------------------- |
| Bundler  | Webpack           | 5.85.0    |                              |
|          | Babel             | 7.22.1    |                              |
| Frontend | React             | 18.2.0    |                              |
|          | Typescript        | 5.1.3     |                              |
|          | Axios             | 1.4.0     |                              |
|          | React-Router      | 6.11.2    |                              |
|          | Recoil            | 0.7.7     |                              |
|          | React Query       | 3.39.3    |                              |
|          | Styled Components | 5.3.10    |                              |
|          | SockJS-Client     | 4.7.0     |                              |
|          | Webstomp-Client   | 4.7.0     |                              |
| Backend  | Spring Framework  | 2.7.12    | Spring Boot, Spring Security |
|          | JPA               |           |                              |
|          | JWT               | jjwt0.9.1 |                              |
|          | OAuth 2.0         |           |                              |
|          | Redis             | 7.0.11    |                              |
|          | MySQL             | 8.0.33    | Database                     |
|          | AWS EC2 , AWS S3  |           | Storage                      |
|          | WebSocket         | 2.7.12    |                              |
|          | Stomp             | 2.7.12    |                              |

❗️상세 스택은 package.json을 참고해 주세요

# 프로젝트 상세

</details>
<br/>

## 미리보기

| 로그인 | 회원가입 |
| :----: | :------: |
|![화면 기록 2023-07-06 오후 7 37 22](https://github.com/DangGeuneDaong/Frontend/assets/87015084/5bd78cca-eac6-48fe-857d-016206fe1ddf) | ![화면 기록 2023-07-06 오후 7 39 57](https://github.com/DangGeuneDaong/Frontend/assets/87015084/2adc7189-3578-4f65-959b-eee8f241fc93)  |

| 소셜 로그인(카카오) | 소셜 로그인(네이버) |
| :-----------------: | :-----------------: |
|                     |                     |

| 메인 | 나눔 글 작성 |
| :--: | :----------: |
|      |              |

| 상세 페이지(신청자) | 상세 페이지(작성자) |
| :-----------------: | :-----------------: |
| ![ezgif com-crop (1)](https://github.com/DangGeuneDaong/Frontend/assets/71238020/30304144-9b2d-430f-8c04-c9f3ed1e2f47) | ![ezgif com-crop](https://github.com/DangGeuneDaong/Frontend/assets/71238020/08f740cb-69e5-42dc-942b-9ce2e46a51eb) |

<br/>

|                                           Frontend                                            |                                          Frontend                                           |                                           Frontend                                            |                                            Frontend                                             |                                           Backend                                            |                                            Backend                                            |                                            Backend                                            |
| :-------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/71238020?v=4" alt="Whale2200" width="80px"> | <img src="https://avatars.githubusercontent.com/u/73399004?v=4" alt="minkyuu" width="80px"> | <img src="https://avatars.githubusercontent.com/u/87015084?v=4" alt="eeseohyun" width="80px"> | <img src="https://avatars.githubusercontent.com/u/110911811?v=4" alt="geniee1220" width="80px"> | <img src="https://avatars.githubusercontent.com/u/122004333?v=4" alt="trsoo24" width="80px"> | <img src="https://avatars.githubusercontent.com/u/56255240?v=4" alt="wpdbs1229" width="80px"> | <img src="https://avatars.githubusercontent.com/u/86875215?v=4" alt="joony9393" width="80px"> |
|                          [Whale2200](https://github.com/Whale2200d)                           |                            [minkyuu](https://github.com/minkyuu)                            |                           [eeseohyun](https://github.com/eeseohyun)                           |                           [geniee1220](https://github.com/geniee1220)                           |                            [trsoo24](https://github.com/trsoo24)                             |                           [wpdbs1229](https://github.com/wpdbs1229)                           |                           [joony9393](https://github.com/joony9393)                           |
