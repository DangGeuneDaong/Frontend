import axios from 'axios';

import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { set, useForm } from 'react-hook-form';

import {
  addPost,
  editPost,
  fetchPost,
  uploadImage,
  useFetchPost,
} from '../../apis/good';

import MainTemplate from '../../components/template/MainTemplate';

import * as S from '../UploadPage/styles';
import Input from '../../components/Form/Input';
import Button from '../../components/Button';
import Textarea from '../../components/Form/Textarea';
import Dropdown from '../../components/Dropdown';
import MultiUploader from '../../components/FileUploader/MultiUploader';
import AlertModal from '../../components/Modal/Alert';
import ConfirmModal from '../../components/Modal/Confirm';
import axiosInstance from '../../apis';

function EditPage() {
  const navigate = useNavigate();
  //   const param = useParams();

  // TODO : API 연동 시점에 param 값으로 post 데이터 가져오기
  const param = '3';
  const { post } = useFetchPost(param);
  console.log('불러온 데이터', post);

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

  useEffect(() => {
    console.log('선택된 파일', selectedFiles);
  }, [selectedFiles]);

  // 수정 페이지 진입 시점에서, post 데이터가 존재하면 폼에 데이터 정보 삽입
  useEffect(() => {
    if (post) {
      console.log('post', post);

      const createFileObjects = async (imageUrls: string[]) => {
        try {
          const imageFilesPromises = imageUrls.map(async (url: string) => {
            const instance = axiosInstance();
            const response = await instance.get(url, { responseType: 'blob' });
            const data = response.data;
            const filename = url.split('/').pop();
            const metadata = { type: data.type };

            return new File([data], filename!, metadata);
          });

          // 모든 이미지가 변환될 때까지 대기한 후 imageFiles에 할당
          const imageFiles = await Promise.all(imageFilesPromises);

          setSelectedFiles(imageFiles);
        } catch (error) {
          console.error('Failed to create file objects:', error);
        }
      };

      setSelectedCategory(post.main_category);
      setSelectedProduct(post.sub_category);
      setValue('title', post.title);
      setValue('description', post.description);

      if (post.good_image_list) {
        createFileObjects(post.good_image_list);
      }
    }
  }, [post, setValue]);

  // 하위 컴포넌트 MultiUploader에서 파일 길이 체크해서 alert 띄우기
  const handleFileLengthCheck = (files: File[]) => {
    if (files.length > 5) {
      setError('files', {
        type: 'validate',
        message: '파일은 최대 5개까지 업로드 가능합니다.',
      });
    } else {
      setSelectedFiles(files);
    }
  };

  // 엔터 입력 시 포커스가 다른 폼으로 넘어가지 않도록 방지
  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  // 폼 전송 취소
  const onClickCancel = () => {
    setConfirmMessage({
      title: '나눔글 수정 취소',
      message: '나눔글 수정을 취소하고 메인 페이지로 돌아가시겠습니까?',
    });
    setShowConfirm(true);
  };

  // 폼 전송
  const { mutateAsync: uploadImagesMutation } = useMutation(uploadImage);
  const { mutate: editPostMutation } = useMutation(editPost, {
    onSuccess: () => {
      setAlertMessage({
        title: '나눔글 수정',
        message: '나눔글이 수정이 완료되었습니다.',
      });
      setShowAlert(true);
      navigate('/');
    },
    onError: (error) => {
      setAlertMessage({
        title: '나눔글 수정 실패',
        message: '나눔글이 수정에 실패했습니다. 다시 시도해주세요.',
      });
      setShowAlert(true);
      console.log(error);
    },
  });

  const onSubmit = async (data: any) => {
    try {
      // NOTE : 이미지 업로드 순서 보장을 위해 mutateAsync 사용
      // muatate는 반환값이 없지만, mutateAsync는 return 값을 Promise로 반환
      const uploadedImages = await uploadImagesMutation(selectedFiles);

      const postData = {
        // user_id : userID 로그인 시 recoil state에서 가져오기
        main_category: selectedCategory,
        sub_category: selectedProduct,
        title: data.title,
        description: data.description,
        status: '판매중',
        good_image_list: uploadedImages,
      };

      editPostMutation(postData);
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
                storedImageList={selectedFiles}
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
                  listData={['사료', '간식', '용품']}
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

export default EditPage;
