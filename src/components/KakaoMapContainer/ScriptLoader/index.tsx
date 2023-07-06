import { ReactNode, useEffect, useState } from 'react';
import Loader from '../../Loader';

interface ScriptLoaderProps {
  children: ReactNode;
}

const KAKAO_MAP_API_KEY = process.env.REACT_APP_KAKAO_MAP_API_KEY;
const KAKAO_MAP_SCRIPT_ID = 'kakao-map-script';

const ScriptLoader = (props: ScriptLoaderProps) => {
  const [mapScriptLoaded, setMapScriptLoaded] = useState(false);

  useEffect(() => {
    const mapScript = document.getElementById(KAKAO_MAP_SCRIPT_ID);

    if (mapScript && !window.kakao) {
      return;
    }

    const script = document.createElement('script');
    script.id = KAKAO_MAP_SCRIPT_ID;
    // libraries : API 호출하기 위한 라이브러리
    // autoload : html script 태그가 아닌 명시적으로 JS 함수 내에서 호출하기 위해 false 값 주입
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`;
    script.onload = () => {
      window.kakao.maps.load(() => {
        setMapScriptLoaded(true);
      });
    }
    script.onerror = () => {
      setMapScriptLoaded(false);
    }

    document.getElementById('mapContainer')?.appendChild(script);
  }, []);


  return (
    <>
      {mapScriptLoaded ? props.children : <Loader/>}
    </>
  );
};

export default ScriptLoader;