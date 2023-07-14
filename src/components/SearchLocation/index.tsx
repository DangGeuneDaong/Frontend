import { useDaumPostcodePopup } from 'react-daum-postcode';
import * as S from './styles';

interface PageProps {
  location: string;
}

interface SearchLocationProps {
  setValue: (name: keyof PageProps, value: any) => void;
  trigger: (name: keyof PageProps) => void;
}

function SearchLocation({ setValue, trigger }: SearchLocationProps) {
  const scriptUrl =
    'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const open = useDaumPostcodePopup(scriptUrl);
  const handleComplete = (data: any) => {
    const { address } = data;
    setValue('location', address);
    trigger('location');
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
