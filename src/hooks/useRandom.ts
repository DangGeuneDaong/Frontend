import { useState } from 'react';

const randomAdjective = [
  '멍때리는',
  '건방진',
  '잠자는',
  '신난',
  '드러누운',
  '밥먹는',
  '코딩하는',
  '삐진',
  '귀여운',
];
const randomNicknamesK = [
  '프로도',
  '라이언',
  '어피치',
  '네오',
  '춘식',
  '튜브',
  '콘',
  '무지',
  '제이지',
];

const randomNicknamesN = [
  '브라운',
  '코니',
  '문',
  '제임스',
  '샐리',
  '레너드',
  '에드워드',
];

export function useRandom() {
  //랜덤닉네임 함수
  function generateRandomNicknameK() {
    const randomAdjectiveValue =
      randomAdjective[Math.floor(Math.random() * randomAdjective.length)];
    const randomNicknameValue =
      randomNicknamesK[Math.floor(Math.random() * randomNicknamesK.length)];

    return `${randomAdjectiveValue} ${randomNicknameValue}`;
  }

  function generateRandomNicknameN() {
    const randomAdjectiveValue =
      randomAdjective[Math.floor(Math.random() * randomAdjective.length)];
    const randomNicknameValue =
      randomNicknamesN[Math.floor(Math.random() * randomNicknamesN.length)];

    return `${randomAdjectiveValue} ${randomNicknameValue}`;
  }

  return { generateRandomNicknameK, generateRandomNicknameN };
}
