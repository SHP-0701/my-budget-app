/*
***************************************************************************
  ▢ 작성일자: 2025. 12. 11.(목)
  ▢ 페이지명: /utils/date.js 
  ▢ 내용: 
    - 날짜 관련 공통 유틸리티(Util) 함수를 모아놓은 파일
    - 날짜 변환(반환), 계산 등등 관련 함수들이 위치함
  ▢ 작성자: 박수훈(shpark)
***************************************************************************
*/

import { format } from 'date-fns';

/**
 * 날짜 객체(date)를 받아 'yyyy-MM-dd' 형식의 문자열로 반환
 * @param { Date | string | number } date
 * @returns { string } 'yyyy-MM-dd'
 */
export const formatDate = (date) => {
  if (!date) return '';

  // 로컬 타임존 기준 날짜 반환
  return format(new Date(date), 'yyyy-MM-dd');
};
