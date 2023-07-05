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

<img width="824" alt="service" src="https://github.com/DangGeuneDaong/Frontend/assets/110911811/578ed772-8e09-4391-b84a-d9649b6709ac">

## ERD

![erd](https://github.com/DangGeuneDaong/Frontend/assets/110911811/ee4fb893-f2dd-426f-873f-463574780d1e)

## 주요 개발 스택

| Category | Package Name      | Version | Remarks                      |
| -------- | ----------------- | ------- | ---------------------------- |
| Bundler  | Webpack           | 5.85.0  |                              |
|          | Babel             | 7.22.1  |                              |
| Frontend | React             | 18.2.0  |                              |
|          | Typescript        | 5.1.3   |                              |
|          | Axios             | 1.4.0   |                              |
|          | React-Router      | 6.11.2  |                              |
|          | Recoil            | 0.7.7   |                              |
|          | React Query       | 3.39.3  |                              |
|          | Styled Components | 5.3.10  |                              |
|          | Socket.io         | 4.7.0   |                              |
| Backend  | Spring Framework  | 2.7.12  | Spring Boot, Spring Security |
|          | JPA               |         |                              |
|          | JWT               |jjwt0.9.1|                              |
|          | OAuth 2.0         |         |                              |
|          | Redis             | 7.0.11  |                              |
|          | MySQL             | 8.0.33  | Database                     |
|          | AWS EC2 , AWS S3  |         | Storage                      |
|          | WebSocket         | 2.7.12  |                              |

❗️상세 스택은 package.json을 참고해 주세요

# 프로젝트 상세

## 개발 내역

<details open> 
<summary>프론트엔드 개발 상세 내역</summary>

### 회원가입& 로그인 페이지

- JWT 인증 로직 구현
- Form Validate - react-hook-form 라이브러리 연동
- 주소 입력 - react-daum-postcode 라이브러리 연동
- 소셜 로그인 구현
  - 네이버 / 카카오 API 연동
  - 소셜 로그인 이후, 추가 정보 입력 페이지로 리다이렉트
    - AWS S3 SDK 인증

### 메인 페이지

- 이미지 스켈레톤 UI 적용
- 나눔글 검색 기능
  - 카테고리 필터 기능 구현
  - (나눔 상태, 반려동물 유형) 필터 기능 구현
- 페이지네이션 구현
- 카카오 지도 API 연동
  - 나눔글의 위, 경도 값을 기반으로 마커 생성

### 나눔글 페이지

- <strong>상세 페이지</strong>
  - 채팅 기능 구현 - Socket.io로 양방향 채팅 구현
    - 채팅방 생성, 삭제 기능
  - (Taker) 나눔글 지원, 지원 취소 기능
  - (Offer) 지원 목록 조회 및 신청자 수락 기능
  - 페이지네이션 구현
- <strong>업로드 페이지</strong>
  - 다중 이미지 업로드 & 이미지 썸네일 구현
  - Form Validate - react-hook-form 라이브러리 연동
- <strong>수정 페이지</strong>
  - AWS S3 SDK 인증
  - 다중 이미지 업로드 & 이미지 썸네일 구현
  - Form Validate - react-hook-form 라이브러리 연동

### 유저 페이지

- 마이 페이지
  - (내가 작성한 나눔글 / 완료된 나눔글 / 내가 신청한 나눔글) 조회
- 프로필 수정 페이지 - AWS S3 SDK 인증
</details>

<details open> 
<summary>백엔드 개발 상세 내역</summary>

### 회원가입 & 로그인 페이지

- JWT 토큰 생성 / 필터 처리 구현
    - Access 토큰 생성 후 api 호출 시 필터 처리
    - Refresh 토큰 Redis 저장
- 유저 주소 입력 시 위도, 경도 값 DB 저장
- 소셜 로그인 구현
  - 네이버 / 카카오 API 연동
  - 소셜 로그인 이후, 소셜에서 제공한 유저 정보 기반 서버 DB 저장하여 회원 관리

### 메인 페이지

- 나눔 글 CRUD 구현
- 상품 이미지 AWS S3 에 URL 값 String 저장 후 사용
- 게시글 검색 필터 기능 구현 ( User 테이블 내 위,경도 값 기준 필터 / 카테고리 기준 필터 / 조회수 기준 정렬 )
- 특정 글 상세 조회 구현
  
### 나눔글 페이지

- <strong>상세 페이지</strong>
  - 채팅 기능 구현 : WebSocket, STOMP 이용 Pub/{roomId} 로 메시지 전송 / Sub/{roomId} 로 메시지 수신
    - 채팅방 생성, 입장, 삭제 기능
  - (Taker) 나눔글 지원 시 Offer 와 Taker 유저 간 위,경도 값 이용하여 거리 표시
  - (Offer) 나눔 상태 (나눔중, 나눔완료) 추가 / 지원 목록 조회 및 신청자 수락 기능 구현

- <strong>업로드 페이지</strong>
  - 다중 이미지 MultiPart File 기능 구현

- <strong>수정 페이지</strong>
  - 이미지 수정 이전 파밀 S3 bucket 에서 삭제
  - 추가 파일은 다시 저장하면서 메모리 절약

### 유저 페이지

- 마이 페이지
  - (내가 작성한 나눔글 / 완료된 나눔글 / 내가 신청한 나눔글) 조회 기능 구현

</details>
<br/>

## 미리보기

| 로그인 | 회원가입 |
| :----: | :------: |
|        |          |

| 소셜 로그인(카카오) | 소셜 로그인(네이버) |
| :-----------------: | :-----------------: |
|                     |                     |

| 메인 | 나눔 글 작성 |
| :--: | :----------: |
|      |              |

| 상세 페이지(신청자) | 상세 페이지(작성자) |
| :-----------------: | :-----------------: |
|                     |                     |

<br/>

|                                           Frontend                                            |                                          Frontend                                           |                                           Frontend                                            |                                            Frontend                                             |                                           Backend                                            |                                            Backend                                            |                                            Backend                                            |
| :-------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/71238020?v=4" alt="Whale2200" width="80px"> | <img src="https://avatars.githubusercontent.com/u/73399004?v=4" alt="minkyuu" width="80px"> | <img src="https://avatars.githubusercontent.com/u/87015084?v=4" alt="eeseohyun" width="80px"> | <img src="https://avatars.githubusercontent.com/u/110911811?v=4" alt="geniee1220" width="80px"> | <img src="https://avatars.githubusercontent.com/u/122004333?v=4" alt="trsoo24" width="80px"> | <img src="https://avatars.githubusercontent.com/u/56255240?v=4" alt="wpdbs1229" width="80px"> | <img src="https://avatars.githubusercontent.com/u/86875215?v=4" alt="joony9393" width="80px"> |
|                          [Whale2200](https://github.com/Whale2200d)                           |                            [minkyuu](https://github.com/minkyuu)                            |                           [eeseohyun](https://github.com/eeseohyun)                           |                           [geniee1220](https://github.com/geniee1220)                           |                            [trsoo24](https://github.com/trsoo24)                             |                           [wpdbs1229](https://github.com/wpdbs1229)                           |                           [joony9393](https://github.com/joony9393)                           |
