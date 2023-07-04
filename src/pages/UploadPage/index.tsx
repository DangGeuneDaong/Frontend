import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';

// api
import { addPost } from '../../apis/good';
import { userState } from '../../states/userInfo';

// components
import MainTemplate from '../../components/template/MainTemplate';

import * as S from './styles';
import Input from '../../components/Form/Input';
import Button from '../../components/Button';
import Textarea from '../../components/Form/Textarea';
import Dropdown from '../../components/Dropdown';
import MultiUploader from '../../components/FileUploader/MultiUploader';
import AlertModal from '../../components/Modal/Alert';
import ConfirmModal from '../../components/Modal/Confirm';

export interface UploadPageCSSProps {
  inputContainerDirection?: 'row' | 'column';
}

const categoryType = [
  { key: 'DOG', value: '강아지' },
  { key: 'CAT', value: '고양이' },
];

const productType = [
  { key: 'FODDER', value: '사료' },
  { key: 'CLOTHES', value: '의류' },
  { key: 'SNACKS', value: '간식' },
  { key: 'SUPPLY', value: '용품' },
];

function UploadPage() {
  const navigate = useNavigate();

  const [userInfo, _setUserInfo] = useRecoilState<any>(userState);

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    title: '',
    message: '',
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState({
    title: '',
    message: '',
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setFocus,
    setError,
    watch,
  } = useForm({ mode: 'onBlur' });

  // 디버깅용 코드
  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );

    return () => subscription.unsubscribe();
  }, [watch]);

  // useEffect(() => {
  //   console.log('선택된 파일', selectedFiles);
  // }, [selectedFiles]);

  // useEffect(() => {
  //   setValue('title', '제목');
  //   setValue('description', '내용');
  // }, []);

  // 엔터 입력 시 포커스가 다른 폼으로 넘어가지 않도록 방지
  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  // 폼 전송 취소
  const onClickCancel = () => {
    setConfirmMessage({
      title: '나눔글 작성 취소',
      message: '나눔글 작성을 취소하고 이전 페이지로 돌아가시겠습니까?',
    });
    setShowConfirm(true);
  };

  // 폼 전송
  const { mutate: addPostMutation } = useMutation(addPost, {
    onSuccess: () => {
      setAlertMessage({
        title: '나눔글 등록',
        message: '나눔글이 등록되었습니다.',
      });
      setShowAlert(true);
    },
    onError: (error) => {
      setAlertMessage({
        title: '나눔글 등록 실패',
        message: '나눔글이 등록에 실패했습니다. 다시 시도해주세요.',
      });
      setShowAlert(true);
      console.log(error);
    },
  });

  const onSubmit = async (data: any) => {
    try {
      // TODO : REFACOTRING
      const mainCategory = categoryType.find(
        (item) => item.value === selectedCategory
      );
      const mainCategoryKey = mainCategory ? mainCategory.key : undefined;

      const subCategory = productType.find(
        (item) => item.value === selectedProduct
      );
      const subCategoryKey = subCategory ? subCategory.key : undefined;

      const postData = {
        userId: userInfo.userId,
        mainCategory: mainCategoryKey,
        subCategory: subCategoryKey,
        title: data.title,
        description: data.description,
        status: 'SHARING',
        files: selectedFiles,
      };

      addPostMutation(postData);
    } catch (error) {
      console.log(error);
    }
  };

  const onAlertMessage = (message: any) => {
    setAlertMessage({
      title: message.title,
      message: message.message,
    });
    setShowAlert(true);
  };

  return (
    <MainTemplate>
      <S.Container>
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleFormKeyDown}>
          <S.Inner>
            {/* 이미지 등록 컨테이너 */}
            <div style={{ marginBottom: '20px' }}>
              <MultiUploader
                onAlertMessage={(message) => onAlertMessage(message)}
                onSelectItem={(files) => setSelectedFiles(files)}
              />
            </div>

            {/* 카테고리 선택 */}
            <S.InputContainer inputContainerDirection="row">
              <S.Title>카테고리</S.Title>
              <S.DropdownContainer>
                <Dropdown
                  listData={['강아지', '고양이']}
                  selectedItem={selectedCategory}
                  onSelectItem={(item) => setSelectedCategory(item)}
                ></Dropdown>
              </S.DropdownContainer>

              <S.DropdownContainer>
                <Dropdown
                  listData={['사료', '의류', '간식', '배변용품']}
                  selectedItem={selectedProduct}
                  onSelectItem={(item) => setSelectedProduct(item)}
                ></Dropdown>
              </S.DropdownContainer>
            </S.InputContainer>

            {/* 제목 입력 */}
            <S.InputContainer>
              <Input
                type="text"
                label="제목 *"
                containerType="content"
                errors={errors}
                style={{ borderRadius: '4px', margin: '0', maxWidth: '656px' }}
                {...register('title', {
                  required: '제목을 입력해주세요',
                })}
              />
            </S.InputContainer>

            {/* 내용 입력 */}
            <S.InputContainer>
              <Textarea
                label="제품정보 *"
                containerType="content"
                errors={errors}
                style={{ borderRadius: '4px', margin: '0' }}
                {...register('description', {
                  required: '내용을 입력해주세요',
                })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    setValue('description', `${watch('description')}\n`);
                  }
                }}
              ></Textarea>
            </S.InputContainer>

            <S.ButtonContainer>
              <Button
                type="button"
                styleType="warning"
                width="128px"
                borderRadius="20px"
                onClickHandler={onClickCancel}
              >
                취소
              </Button>

              <Button width="128px" borderRadius="20px">
                완료
              </Button>
            </S.ButtonContainer>
          </S.Inner>
        </form>
      </S.Container>

      {showAlert && (
        <AlertModal
          title={alertMessage.title}
          message={alertMessage.message}
          alignType="top"
          onConfirm={() => setShowAlert(false)}
        />
      )}

      {showConfirm && (
        <ConfirmModal
          title={confirmMessage.title}
          message={confirmMessage.message}
          confirmType="warning"
          alignType="top"
          onCancel={() => {
            setShowConfirm(false);
          }}
          onConfirm={() => {
            navigate('/');
          }}
        />
      )}
    </MainTemplate>
  );
}

export default UploadPage;
