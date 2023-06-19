import * as S from './styles';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  color?: string;
}

function Modal({ onClose, children, color }: ModalProps) {
  return (
    <S.Container>
      <S.AlertContainer color={color}>
        {children}
        <button onClick={onClose}>X</button>
      </S.AlertContainer>
    </S.Container>
  );
}

export default Modal;
