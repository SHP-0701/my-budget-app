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
import { useState } from 'react';
import MenuLayout from '@/components/MenuLayout';
import styles from '@/styles/Stats.module.css';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { FaChartPie, FaChartBar, FaCrown } from 'react-icons/fa';

export default function StatsPage() {
  const [currentDate, setCurrentDate] = useState('2025년 12월');

  // dummy-data(1)
  const SUMMARY_DATA = {
    income: 3500000,
    expense: 1250000,
    balance: 2250000,
  };

  // dummy-data(2)
  const BAR_DATA = [
    {
      name: '1주',
      income: 500000,
      expense: 240000,
    },
    {
      name: '2주',
      income: 0,
      expense: 450000,
    },
    {
      name: '3주',
      income: 1200000,
      expense: 180000,
    },
    {
      name: '4주',
      income: 1800000,
      expense: 380000,
    },
  ];

  // dummy-data(3)
  const PIE_DATA = [
    {
      name: '식비',
      value: 450000,
      color: '#ff8042',
    },
    {
      name: '쇼핑',
      value: 300000,
      color: '#00c49f',
    },
    {
      name: '교통',
      value: 120000,
      color: '#0088fe',
    },
    {
      name: '주거',
      value: 150000,
      color: '#ffbb28',
    },
    {
      name: '기타',
      value: 80000,
      color: '#8884d8',
    },
  ];

  // 숫자 포맷팅(천 단위 콤마(,))
  const formatMoney = (amount) => amount.toLocaleString();

  return (
    <MenuLayout>
      <div className={styles.container}>
        {/** [상단] 헤더 및 요약 카드 */}
        <header className={styles.header}>
          <div className={styles.title}>{currentDate} 통계</div>
          <div className={styles.summaryCards}>
            <div className={styles.card}>
              <span className={styles.cardLabel}>총 수입</span>
              <span className={`${styles.cardValue} ${styles.incomeText}`}>
                +{formatMoney(SUMMARY_DATA.income)}
              </span>
            </div>
            <div className={styles.card}>
              <span className={styles.cardLabel}>총 지출</span>
              <span className={`${styles.cardValue} ${styles.expenseText}`}>
                -{formatMoney(SUMMARY_DATA.expense)}
              </span>
            </div>
            <div className={styles.card}>
              <span className={styles.cardLabel}>남은 돈</span>
              <span className={`${styles.cardValue} ${styles.balanceText}`}>
                {formatMoney(SUMMARY_DATA.balance)}
              </span>
            </div>
          </div>
        </header>
      </div>
    </MenuLayout>
  );
}
