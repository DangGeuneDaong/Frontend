import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';

import { useRecoilState } from 'recoil';
import { userState } from '../../states/userInfo';

import { addPost, editPost, fetchPost, useFetchPost } from '../../apis/good';

import MainTemplate from '../../components/template/MainTemplate';

import * as S from '../UploadPage/styles';
import Input from '../../components/Form/Input';
import Button from '../../components/Button';
import Textarea from '../../components/Form/Textarea';
import Dropdown from '../../components/Dropdown';
import MultiUploader from '../../components/FileUploader/MultiUploader';
import AlertModal from '../../components/Modal/Alert';
import ConfirmModal from '../../components/Modal/Confirm';
import Loader from '../../components/Loader';

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

const getCategoryValueByKey = (key: string) => {
  const category = categoryType.find((item) => item.key === key);
  return category ? category.value : undefined;
};

const getProductValueByKey = (key: string) => {
  const product = productType.find((item) => item.key === key);
  return product ? product.value : undefined;
};

// type 0 : category, 1 : product
const getKeyByValue = (value: string, type: string) => {
  if (type === 'category') {
    const category = categoryType.find((item) => item.value === value);
    return category && category.key;
  } else {
    const product = productType.find((item) => item.value === value);
    return product && product.key;
  }
};

function EditPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // const postID = param.id as string;
  const { post } = useFetchPost(id as string);

  const [isPostLoading, setIsPostLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // const [userInfo, _setUserInfo] = useRecoilState<any>(userState);

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [storedImageList, setStoredImageList] = useState<string[]>([
    // 'https://dummyimage.com/420x320/ff7f7f/333333.png&text=Sample',
    // 'https://dummyimage.com/420x320/ff7f7f/333333.png&text=Sample2',
  ]);

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
  // useEffect(() => {
  //   const subscription = watch((value, { name, type }) =>
  //     console.log(value, name, type)
  //   );

  //   return () => subscription.unsubscribe();
  // }, [watch]);

  // useEffect(() => {
  //   console.log('선택된 파일', selectedFiles);
  // }, [selectedFiles]);

  // useEffect(
  //   () => console.log('선택된 카테고리', selectedCategory, selectedProduct),
  //   [selectedCategory, selectedProduct]
  // );

  // 수정 페이지 진입 시점에서, post 데이터가 존재하면 폼에 데이터 정보 삽입
  useEffect(() => {
    if (post) {
      console.log('post', post);

      // if (
      //   !isLoading &&
      //   localStorage.getItem('userInfo') !== post.offerNickName
      // ) {
      //   setConfirmMessage({
      //     title: '잘못된 접근입니다.',
      //     message:
      //       '요청하신 페이지에 접근할 수 없습니다. 메인 페이지로 이동합니다.',
      //   });
      //   setShowConfirm(true);
      // }

      const categoryValue = getCategoryValueByKey(post.mainCategory);
      const productValue = getProductValueByKey(post.subCategory);

      setSelectedCategory(categoryValue!);
      setSelectedProduct(productValue!);

      setValue('title', post.title);
      setValue('description', post.description);

      if (post.goodImageList) {
        setStoredImageList(post.goodImageList);
      }
    }
    setIsLoading(false);
  }, [post, setValue]);

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
  const { mutate: editPostMutation } = useMutation(editPost, {
    onMutate: () => {
      setIsPostLoading(true);
    },
    onSuccess: () => {
      setAlertMessage({
        title: '나눔글 수정',
        message: '나눔글이 수정이 완료되었습니다.',
      });
      setShowAlert(true);
    },
    onError: (error) => {
      setAlertMessage({
        title: '나눔글 수정 실패',
        message: '나눔글이 수정에 실패했습니다. 다시 시도해주세요.',
      });
      setShowAlert(true);
      console.log(error);
    },
    onSettled: () => {
      setIsPostLoading(false);
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setIsPostLoading(true);

      const mainCategory = getKeyByValue(selectedCategory, 'category');
      const subCategory = getKeyByValue(selectedProduct, 'product');

      const postData = {
        goodId: id,
        mainCategory: mainCategory,
        subCategory: subCategory,
        title: data.title,
        description: data.description,
        status: 'SHARING',
        goodImageList: storedImageList,
        files: selectedFiles,
      };

      editPostMutation(postData);
    } catch (error) {
      console.log(error);
      setIsPostLoading(false);
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
                storedImageList={storedImageList}
                handleStoredImageList={(imageList) => {
                  setStoredImageList(imageList);
                }}
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
                  listData={['사료', '의류', '간식', '용품']}
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
                  if (e.keyCode === 13 && e.nativeEvent.keyCode !== 229) {
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

              <Button
                width="128px"
                borderRadius="20px"
                styleType={isPostLoading ? 'disabled' : 'primary'}
                style={{ position: 'relative' }}
              >
                {isPostLoading ? <Loader width={30} height={30} /> : '완료'}
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
          onConfirm={() => {
            alertMessage.title === '이미지 등록 개수 초과'
              ? setShowAlert(false)
              : navigate('/');
          }}
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
