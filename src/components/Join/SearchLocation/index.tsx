import { useDaumPostcodePopup } from 'react-daum-postcode';
import { JoinPageProps } from '../../../pages/JoinPage';

import * as S from './styles';

interface SearchLocationProps {
  setValue: (name: keyof JoinPageProps, value: any) => void;
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
      주소검색
    </S.AddressSearchButton>
  );
}

export default SearchLocation;
