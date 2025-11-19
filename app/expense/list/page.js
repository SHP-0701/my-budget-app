/*
**********************************************************************************************************************************************
  ▢ 작성일자: 2025. 11. 11.(화)
  ▢ 파일명: /expense/list/page.js
  ▢ 내용
    - 지출 관리(expense) 중 지출/수입 내역 조회(/expense/list 로 페이지 호출)
    - 월별 기본 조회 + 날짜/카테고리/구분 필터 기능
  ▢ 작성자: 박수훈(shpark)
**********************************************************************************************************************************************
*/

'use client';
import { useState } from 'react';
import MenuLayout from '@/components/MenuLayout';
import styles from '@/styles/ExpenseList.module.css';
import { useRouter } from 'next/navigation';
import { IoMdArrowBack } from 'react-icons/io';
import { FaCalendarAlt, FaFilter, FaListAlt } from 'react-icons/fa';

export default function ExpenseList() {
  const router = useRouter();

  // 현재 년/월
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  // 필터 상태
  const [filters, setFilters] = useState({
    year: currentYear,
    month: currentMonth,
    type: 'all', // all(전체), expense(지출), income(수입)
    category: 'all',
  });

  // 더미 데이터(전체 내역)
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: '2025-11-18',
      type: 'expense',
      category: '식비',
      description: '점심 식사',
      amount: 15000,
    },
    {
      id: 2,
      date: '2025-11-17',
      type: 'expense',
      category: '교통',
      description: '지하철',
      amount: 2500,
    },
    {
      id: 3,
      date: '2025-11-15',
      type: 'income',
      category: '급여',
      description: '11월 급여',
      amount: 3000000,
    },
    {
      id: 4,
      date: '2025-11-14',
      type: 'expense',
      category: '쇼핑',
      description: '의류 구매',
      amount: 85000,
    },
    {
      id: 5,
      date: '2025-11-12',
      type: 'expense',
      category: '식비',
      description: '저녁 회식',
      amount: 45000,
    },
  ]);

  // 카테고리 목록
  const categories = {
    all: ['전체'],
    expense: ['식비', '교통', '쇼핑', '의료', '문화', '기타'],
    income: ['급여', '상여', '기타'],
  };

  // 필터 변경 핸들러
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      // 구분(type) 변경 시 카테고리 초기화
      ...(name === 'type' && { category: 'all' }),
    }));
  };

  // 대시보드로 돌아가기
  const handleBack = () => {
    router.push('/expense');
  };

  return (
    <MenuLayout>
      <div className={styles.container}>
        {/** 헤더(Header) 영역 */}
        <div className={styles.header}>
          <button
            onClick={handleBack}
            className={styles.backButton}
            type='button'
          >
            <IoMdArrowBack />
            대시보드
          </button>
          <h1 className={styles.title}>지출 내역</h1>
          <p className={styles.subtitle}>월별 지출/수입 내역을 확인하세요</p>
        </div>

        {/** 필터 바 */}
        <div className={styles.filterBar}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>
              <FaCalendarAlt className={styles.icon} />
              년/월
            </label>
            <div className={styles.dateFilter}>
              <select
                name='year'
                value={filters.year}
                onChange={handleFilterChange}
                className={styles.select}
              >
                {[2023, 2024, 2025].map((year) => (
                  <option key={year} value={year}>
                    {year}년
                  </option>
                ))}
              </select>
              <select
                name='month'
                value={filters.month}
                onChange={handleFilterChange}
                className={styles.select}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month}>
                    {month}월
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </MenuLayout>
  );
}
