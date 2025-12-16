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
import { FaChartPie, FaChartBar, FaCrown, FaCrow } from 'react-icons/fa';

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
        <div className={styles.header}>
          <h1 className={styles.title}>통계/분석</h1>
          <p className={styles.subtitle}>
            {currentDate}의 지출 흐름을 한눈에 파악하세요
          </p>
        </div>

        {/** 요약 카드 섹션 */}
        <section className={styles.summarySection}>
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
        </section>

        {/** [중단] 수입/지출 흐름(막대 차트) */}
        <section className={styles.chartSection}>
          <h3 className={styles.sectionTitle}>
            <FaChartBar /> 월간 수입/지출 흐름
          </h3>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart
                data={BAR_DATA}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray='3 3' vertical={false} />
                <XAxis dataKey='name' tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value) => `${formatMoney(value)}원`}
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                />
                <Legend iconType='circle' />
                <Bar
                  dataKey='income'
                  name='수입'
                  fill='#4dabf7'
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
                <Bar
                  dataKey='expense'
                  name='지출'
                  fill='#ff6b6b'
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/** [하단] 카테고리 분석(좌: 도넛, 우: 랭킹) */}
        <section className={styles.rowSection}>
          {/** 왼쪽: 도넛 차트 */}
          <div className={styles.halfCard}>
            <h3 className={styles.sectionTitle}>
              <FaChartPie /> 지출 카테고리
            </h3>
            <div className={styles.chartWrapper}>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={PIE_DATA}
                    cx='50%'
                    cy='50%'
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey='value'
                  >
                    {PIE_DATA.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${formatMoney(value)}원`} />
                  <Legend
                    verticalAlign='bottom'
                    height={36}
                    iconType='circle'
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/** 오른쪽: Top 랭킹 */}
          <div className={styles.halfCard}>
            <h3 className={styles.sectionTitle}>
              <FaCrown style={{ color: '#ffd700' }} /> 지출 Top 5
            </h3>
            <div className={styles.rankingList}>
              {PIE_DATA.sort((a, b) => b.value - a.value).map((item, idx) => (
                <div key={idx} className={styles.rankItem}>
                  <div className={styles.rankHeader}>
                    <div>
                      <span className={styles.rankBadge}>{idx + 1}위</span>
                      <span>{item.name}</span>
                    </div>
                    <span>{formatMoney(item.value)}원</span>
                  </div>
                  <div className={styles.rankBarBg}>
                    <div
                      className={styles.rankBarFill}
                      style={{
                        width: `${(item.value / PIE_DATA[0].value) * 100}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MenuLayout>
  );
}
