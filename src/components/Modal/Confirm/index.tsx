import * as S from '../styles';
import { ModalCSSProps } from '../model';

interface AlertModalProps extends ModalCSSProps {
  title: string;
  message: string; // 텍스트만 있는 경우 message
  confirmText?: string; // 확인 버튼 텍스트
  cancelText?: string; // 취소 버튼 텍스트
  children?: React.ReactNode; // 텍스트 외에 다른 컴포넌트가 있는 경우 children
  onConfirm: () => void; // 확인 버튼 클릭 시 실행할 함수
  onCancel: () => void; // 취소 버튼 클릭 시 실행할 함수
}

const ConfirmModal = ({
  title,
  message,
  children,
  confirmType = 'confirm',
  confirmText = '확인',
  cancelText = '취소',
  alignType = 'center',
  onCancel,
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
          <S.CancelButton onClick={onCancel}>{cancelText}</S.CancelButton>
          <S.ConfirmButton onClick={onConfirm} confirmType={confirmType}>
            {confirmText}
          </S.ConfirmButton>
        </S.ButtonContainer>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default ConfirmModal;
