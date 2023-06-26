import { useDaumPostcodePopup } from 'react-daum-postcode';
import { AddInfoProps } from '../../pages/RedirectPage/AddInfoPage';
import { LoginPageProps } from '../../pages/LoginPage';
import * as S from './styles';

interface PageProps {
  location: string;
}

interface SearchLocationProps {
  setValue: (name: keyof PageProps, value: any) => void;
}

function SearchLocation({ setValue }: SearchLocationProps) {
  const scriptUrl =
    'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const open = useDaumPostcodePopup(scriptUrl);
  const handleComplete = (data: any) => {
    const { address } = data;
    setValue('location', address);
  };
  const handleClick = () => {
    open({
      onComplete: handleComplete,
    });
  };
  return (
    <S.AddressSearchButton onClick={handleClick}>
      주소 검색
    </S.AddressSearchButton>
  );
}

export default SearchLocation;
