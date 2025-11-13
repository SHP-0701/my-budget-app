/*
**********************************************************************************************************************************************
  ▢ 작성일자: 2025. 11. 11.(화)
  ▢ 파일명: /expense/page.js
  ▢ 내용
    - 지출 관리(expense) 메인 대시보드(dashboard) 화면
    - 메인화면에서 '지출관리' 카드를 선택하면 이동되는 대시보드 페이지
    - '이번달 지출', '수입', '잔액', '많이 쓴 카테고리'의 4개 카드를 포함하여 다양한 내용을 요약해서 보여줌.
  ▢ 작성자: 박수훈(shpark)
**********************************************************************************************************************************************
*/

'use client';
import MenuLayout from '@/components/MenuLayout';
import styles from '@/styles/Expense.module.css';
import { useRouter } from 'next/navigation';

export default function ExpenseDashboard() {
  const router = useRouter();

  // 더미 데이터(추후 실제 데이터로 교체)
  const summaryData = {
    totalExpense: 1234500,
    totalIncome: 3000000,
    balance: 1765500,
    topCategory: '식비',
  };

  // 더미 데이터_2(최근 거래 내역 임시 데이터)
  const recentTransactions = [
    {
      id: 1,
      date: '2025-11-12',
      category: '식비',
      description: '점심 식사',
      amount: -15000,
      type: 'expense',
    },
    {
      id: 2,
      date: '2025-11-11',
      category: '교통',
      description: '지하철',
      amount: -2500,
      type: 'expense',
    },
    {
      id: 3,
      date: '2025-11-10',
      category: '급여',
      description: '월급',
      amount: 3000000,
      type: 'income',
    },
    {
      id: 4,
      date: '2025-11-09',
      category: '쇼핑',
      description: '의류 구매',
      amount: -85000,
      type: 'expense',
    },
    {
      id: 5,
      date: '2025-11-08',
      category: '식비',
      description: '저녁 회식',
      amount: -45000,
      type: 'expense',
    },
  ];

  // 더미 데이터_3(지출 예정 내역)
  const upcomingExpenses = [
    { id: 1, date: '11/15', description: '통신비', amount: 55000 },
    { id: 2, date: '11/20', description: '보험료', amount: 120000 },
    { id: 3, date: '11/25', description: '월세', amount: 500000 },
    { id: 4, date: '11/27', description: '생일선물', amount: 200000 },
  ];

  // 오늘 날짜
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`;

  return (
    <MenuLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>지출관리 대시보드</h1>
        <p className={styles.subtitle}>
          이번 달 재정 현황<b>({formattedDate} 기준)</b>을 한 눈에 확인하세요
        </p>

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

        {/* 최근 거래 내역 및 오른쪽 영역(빠른 액션 + 지출 예정) */}
        <div className={styles.recentSection}>
          {/** 테이블 영역 */}
          <div className={styles.tableArea}>
            <h2 className={styles.sectionTitle}>최근 거래 내역</h2>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <colgroup>
                  <col />
                  <col />
                  <col />
                  <col />
                </colgroup>
                <thead>
                  <tr>
                    <th>날짜</th>
                    <th>카테고리</th>
                    <th>내용</th>
                    <th>금액</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.date}</td>
                      <td>
                        <span className={styles.categoryBadge}>
                          {transaction.category}
                        </span>
                      </td>
                      <td>{transaction.description}</td>
                      <td
                        className={
                          transaction.type === 'income'
                            ? styles.amountIncome
                            : styles.amountExpense
                        }
                      >
                        {transaction.amount.toLocaleString()}원
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/** 오른쪽 사이드 영역(빠른 메뉴 + 지출 예정) */}
          <div className={styles.sideArea}>
            {/* 빠른 액션 영역(버튼 가로 배치) */}
            <div className={styles.quickActionsArea}>
              <h2 className={styles.quickActionsTitle}>빠른 메뉴</h2>
              <div className={styles.quickActionsButtons}>
                <button
                  className={styles.actionButton}
                  onClick={() => router.push('/expense/input')}
                >
                  ✏️ 지출 입력
                </button>
                <button
                  className={`${styles.actionButton} ${styles.secondary}`}
                  onClick={() => router.push('/expense/list')}
                >
                  📋 내역 전체
                </button>
              </div>
            </div>

            {/* 지출 예정 내역(테이블 형식) */}
            <div className={styles.upcomingExpensesArea}>
              <h2 className={styles.upcomingExpensesTitle}>지출 예정</h2>
              <div className={styles.tableWrapper}>
                <table className={styles.upcomingTable}>
                  <colgroup>
                    <col />
                    <col />
                    <col />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>날짜</th>
                      <th>내용</th>
                      <th>금액</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingExpenses.map((item) => (
                      <tr key={item.id}>
                        <td>{item.date}</td>
                        <td>{item.description}</td>
                        <td className={styles.upcomingAmount}>
                          {item.amount.toLocaleString()}원
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MenuLayout>
  );
}
