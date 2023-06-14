import { ReactNode, useEffect, useState } from 'react';

interface ScriptLoaderProps {
  children: ReactNode;
}

// API KEY 분리 필요
const KAKAO_MAP_APP_KEY = 'a866688962e7278557cff60cdac5a2af';
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
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_APP_KEY}&libraries=services,clusterer&autoload=false`;
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
      {
        mapScriptLoaded ? props.children : (
          <div>
            지도를 가져오는 중입니다.
          </div>
        )
      }
    </>
  );
};

export default ScriptLoader;