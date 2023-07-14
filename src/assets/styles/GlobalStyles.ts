import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    :root {
        --header-height: 70px;
        --footer-height: 140px;
    }

  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html,
  body {
    font-family: 'Spoqa Han Sans Neo', 'Pretendard Variable', -apple-system, "Apple SD Gothic Neo",'Noto Sans KR', Arial,  "Malgun Gothic", "맑은 고딕", "Nanum Gothic", Dotum, '돋움', Helvetica, sans-serif;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    @supports (-webkit-touch-callout: none) {
      height: -webkit-fill-available;
    }

    *::-webkit-scrollbar {
      display: none;
    }
  }

  html {
    font-size: 62.5%;
  }

  body {
    position: relative;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 1.6rem;
    color:#333;
    letter-spacing: -0.8px;

    a {
        color:inherit;
        text-decoration: none;
    }
  }

  input[type=number]::-webkit-outer-spin-button,
  input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0; /* Some margin before the text */
  }

  input{
    &::placeholder{
      color: #aaa;
    }
  }

  ul, ol, li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: #333; 
  }

  a:visited, a:focus, a:active {
    text-decoration: none; 
  }

  label, input {
    vertical-align: middle; 
  }

  img {
    border: 0;
    vertical-align: top;
    max-width: 100%; 
  }

  button {
    margin: 0;
    padding: 0;
    border: 0;
    width: auto;
    border-radius: 0;
    overflow: visible;
    background: transparent;
    color: inherit;
    font: inherit;
    line-height: normal;
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;
    -webkit-appearance: none;
    cursor: pointer;
  }

  button:focus {
    outline: 0;
  }

`;

export default GlobalStyles;
