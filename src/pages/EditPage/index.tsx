import S3 from 'aws-sdk/clients/s3';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { set, useForm } from 'react-hook-form';

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

const s3 = new S3({
  accessKeyId: `${process.env.REACT_APP_AWS_ACCESS_KEY}`,
  secretAccessKey: `${process.env.REACT_APP_AWS_SECRET_ACCESS_KEY}`,
  region: `${process.env.REACT_APP_AWS_REGION}`,
});

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

function EditPage() {
  const navigate = useNavigate();
  const param = useParams();

  const postID = param.id as string;
  const { post } = useFetchPost(postID);

  const [isLoading, setIsLoading] = useState(false);

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
  // useEffect(() => {
  //   const subscription = watch((value, { name, type }) =>
  //     console.log(value, name, type)
  //   );

  //   return () => subscription.unsubscribe();
  // }, [watch]);

  // useEffect(() => {
  //   console.log('선택된 파일', selectedFiles);
  // }, [selectedFiles]);

  // 수정 페이지 진입 시점에서, post 데이터가 존재하면 폼에 데이터 정보 삽입
  useEffect(() => {
    if (post) {
      console.log('post', post);

      const getImageFromS3 = async (url: string) => {
        const bucket = `${process.env.REACT_APP_AWS_BUCKET}/good`;
        const key = url.substring(url.lastIndexOf('/') + 1);

        try {
          const response = await s3
            .getObject({ Bucket: bucket, Key: key })
            .promise();

          if (response.Body === undefined) {
            throw new Error('이미지 데이터가 없습니다.');
          }

          const blob = new Blob([response.Body as BlobPart], {
            type: response.ContentType,
          });

          return blob;
        } catch (error) {
          console.error('S3에서 데이터를 불러오는 데 실패했습니다.', error);
          throw error;
        }
      };

      const createFileObjects = async (imageUrls: string[]) => {
        try {
          const imageFilesPromises = imageUrls.map(async (url: string) => {
            const response = await getImageFromS3(url);
            const filename = url.split('/').pop();
            const metadata = { type: response.type };

            console.log('response', response);
            return new File([response], filename!, metadata);
          });

          const imageFiles = await Promise.all(imageFilesPromises);
          setSelectedFiles(imageFiles);
        } catch (error) {
          console.error('파일 객체 생성에 실패했습니다:', error);
        }
      };

      const categoryValue = getCategoryValueByKey(post.mainCategory);
      const productValue = getProductValueByKey(post.subCategory);

      setSelectedCategory(categoryValue!);
      setSelectedProduct(productValue!);

      setValue('title', post.title);
      setValue('description', post.description);

      if (post.goodImageList) {
        createFileObjects(post.goodImageList);
      }
    }
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
      setIsLoading(true);
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
      setIsLoading(false);
    },
  });

  const onSubmit = async (data: any) => {
    try {
      // TODO : REFACOTRING
      setIsLoading(true);

      const mainCategory = categoryType.find(
        (item) => item.value === selectedCategory
      );
      const mainCategoryKey = mainCategory ? mainCategory.key : undefined;

      const subCategory = productType.find(
        (item) => item.value === selectedProduct
      );
      const subCategoryKey = subCategory ? subCategory.key : undefined;

      const postData = {
        goodId: param,
        mainCategory: mainCategoryKey,
        subCategory: subCategoryKey,
        title: data.title,
        description: data.description,
        status: 'SHARING',
        files: selectedFiles,
      };

      editPostMutation(postData);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
                styleType={isLoading ? 'disabled' : 'primary'}
                style={{ position: 'relative' }}
              >
                {isLoading ? <Loader width={30} height={30} /> : '완료'}
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
          onConfirm={() => navigate('/')}
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
