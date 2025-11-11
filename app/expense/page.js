/*
**********************************************************************************************************************************************
  ▢ 작성일자: 2025. 11. 11.(화)
  ▢ 파일명: /expense/page.js
  ▢ 내용
    - 지출 관리(expense) 메인 대시보드(dashboard) 화면
    - 메인화면에서 '지출관리' 카드를 선택하면 이동되는 대시보드 페이지
  ▢ 작성자: 박수훈(shpark)
**********************************************************************************************************************************************
*/

import MenuLayout from '@/components/MenuLayout';
import styles from '@/styles/Expense.module.css';

export default function ExpenseDashboard() {
  // 더미 데이터(추후 실제 데이터로 교체)
  const summaryData = {
    totalExpense: 1234500,
    totalIncome: 3000000,
    balance: 1765500,
    topCategory: '식비',
  };

  return (
    <MenuLayout>
      <div className={styles.container}>
        <h1>지출관리 대시보드(dashboard)</h1>
        <p>이번 달 재정 현황 한눈에 확인</p>

        {/* 요약 카드 4개(이번 달 수입, 지출, 잔액, 최대 사용 카테고리) */}
        <div className={styles.summaryCards}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>💸</div>
            <div className={styles.cardContent}>
              <p className={styles.cardLabel}>이번 달 지출</p>
              <h2 className={styles.cardValue}>
                {summaryData.totalExpense.toLocaleString()}원
              </h2>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>💰</div>
            <div className={styles.cardContent}>
              <p className={styles.cardLabel}>이번 달 수입</p>
              <h2 className={styles.cardValue}>
                {summaryData.totalIncome.toLocaleString()}원
              </h2>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>💳</div>
            <div className={styles.cardContent}>
              <p className={styles.cardLabel}>잔액</p>
              <h2 className={styles.cardValue}>
                {summaryData.balance.toLocaleString()}원
              </h2>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>🏆</div>
            <div className={styles.cardContent}>
              <p className={styles.cardLabel}>최다 지출 카테고리</p>
              <h2 className={styles.cardValue}>{summaryData.topCategory}</h2>
            </div>
          </div>
        </div>
      </div>
    </MenuLayout>
  );
}
