import * as S from './styles';
import { AiOutlineClose } from 'react-icons/ai';

export interface HashtagCSSProps {
  onClick?: () => void;
}

interface HashtagProps extends HashtagCSSProps {
  tag: string;
  onDelete: (tag: string) => void;
}

function Hashtag({ tag, onClick, onDelete }: HashtagProps) {
  return (
    <S.Hashtag>
      <span onClick={onClick}>#&nbsp;{tag}</span>

      {/* 삭제 이벤트가 있을 때 close 버튼 노출 */}
      {onDelete && (
        <AiOutlineClose className="closeButton" onClick={() => onDelete(tag)} />
      )}
    </S.Hashtag>
  );
}

export default Hashtag;
