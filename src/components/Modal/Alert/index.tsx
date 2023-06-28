import * as S from '../styles';
import { ModalCSSProps } from '../model';

interface AlertModalProps extends ModalCSSProps {
  title: string;
  message: string; // 텍스트만 있는 경우 message
  children?: React.ReactNode; // 텍스트 외에 다른 컴포넌트가 있는 경우 children
  confirmText?: string; // 확인 버튼 텍스트
  onConfirm: () => void; // 확인 버튼 클릭 시 실행할 함수
}

const AlertModal = ({
  title,
  message,
  children,
  confirmType = 'confirm', //warning
  confirmText = '확인',
  alignType = 'center',
  onConfirm,
}: AlertModalProps) => {
  return (
    <S.ModalOverlay>
      <S.ModalContainer alignType={alignType}>
        <S.ModalHeader>{title}</S.ModalHeader>
        <S.ModalContent>
          {message}
          {children}
        </S.ModalContent>
        <S.ButtonContainer>
          <S.ConfirmButton onClick={onConfirm} confirmType={confirmType}>
            {confirmText}
          </S.ConfirmButton>
        </S.ButtonContainer>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default AlertModal;
