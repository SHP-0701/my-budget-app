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
  return (
    <MenuLayout>
      <div className={styles.container}>
        <h1>지출관리 대시보드(dashboard)</h1>
        <p>대시보드 내용이 들어감</p>
      </div>
    </MenuLayout>
  );
}
