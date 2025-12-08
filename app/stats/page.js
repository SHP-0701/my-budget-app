/*
**********************************************************************************************************************************************
  ▢ 작성일자: 2025. 12. 8.(월)
  ▢ 파일명: /stats/page.js
  ▢ 내용
    - 지출 및 수입 내역을 바탕으로 통계(그래프, 표 등) 데이터를 보여주는 페이지
  ▢ 작성자: 박수훈(shpark)
**********************************************************************************************************************************************
*/

'use client';
import MenuLayout from '@/components/MenuLayout';
import { useRouter } from 'next/navigation';

export default function statPage() {
  const router = useRouter();

  return <MenuLayout></MenuLayout>;
}
