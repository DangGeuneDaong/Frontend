import * as S from './Hashtag.styles';
import { AiOutlineClose } from 'react-icons/ai';

interface HashtagProps {
  tag: string;
  onDelete: (tag: string) => void;
}

function Hashtag({ tag, onDelete }: HashtagProps) {
  return (
    <S.Hashtag>
      #&nbsp;{tag}
      <AiOutlineClose
        style={{ marginTop: '1px', marginLeft: '2px', fill: '#9E9D9D' }}
        onClick={() => onDelete(tag)}
      />
    </S.Hashtag>
  );
}

export default Hashtag;
