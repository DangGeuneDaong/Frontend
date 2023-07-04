import { Route, Routes } from 'react-router-dom';
import { userFetchInfo } from './apis/user';

// 메인 페이지
import MainPage from './pages/MainPage';

// 로그인 & 회원가입 페이지
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';
import RedirectKakaoPage from './pages/RedirectPage/Kakao';
import RedirectNaverPage from './pages/RedirectPage/Naver';

// 나눔글 상세 페이지
import TakerPage from './pages/TakerPage';
import OfferPage from './pages/OfferPage';

// 나눔글 작성 & 수정 페이지
import UploadPage from './pages/UploadPage';
import EditPage from './pages/EditPage';

// 정보 추가 페이지
import AddInfoPage from './pages/RedirectPage/AddInfoPage';

// 마이 페이지
import MyPage from './pages/MyPage';

// 프로필 수정 페이지
import EditProfilePage from './pages/EditProfilePage';

export default function App() {
  const userId = localStorage.getItem('userId');
  userFetchInfo(userId as string);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/taker" element={<TakerPage />} />
      <Route path="/offer" element={<OfferPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/redirect-kakao" element={<RedirectKakaoPage />} />
      <Route path="/redirect-naver" element={<RedirectNaverPage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/edit" element={<EditPage />} />
      <Route path="/addInfo" element={<AddInfoPage />} />
      <Route path="/signup" element={<JoinPage />} />
      <Route path="/edit-profile" element={<EditProfilePage />} />
    </Routes>
  );
}
