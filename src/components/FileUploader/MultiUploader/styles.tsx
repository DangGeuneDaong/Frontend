import styled from 'styled-components';

export const FileUploaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

export const FileUploaderWrapper = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 188px;
  height: 188px;
  padding: 28px 10px;
  background-color: ${(props) => props.theme.color.lightGray};
  color: #aaa6a6;

  .cameraIcon {
    width: 66px;
    height: 66px;
  }
`;

export const FileUploaderGuideText = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

export const FileCountContainer = styled.div`
  margin-top: 10px;
  font-size: 30px;
  font-weight: 600;
`;

export const FileUploaderInput = styled.input`
  display: none;
`;

export const FileUploaderLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
`;

// Thumbnail
export const ThumbnailContainer = styled.div`
  position: relative;
  width: 188px;
  height: 188px;
  background-color: ${(props) => props.theme.color.lightGray};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const DeleteRegisterImageButton = styled.button`
  position: absolute;
  top: -5px;
  right: -8px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 50%;
`;
