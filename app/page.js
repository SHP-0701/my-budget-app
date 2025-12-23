/*
***************************************************************************
  ▢ (작성일자) 2025. 11. 11.(화)
  ▢ (페이지명) /app/page.js 
  ▢ (내용) 
    - 가계부 어플리케이션의 메인화면(로그인 페이지)
    - 로그인 후 지출관리 대시보드(/expense/page.js)로 이동
  ▢ (작성자) 박수훈(shpark)
***************************************************************************
*/

import Link from 'next/link';
import styles from '@/styles/page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>SH budget</h1>
        <p className={styles.subtitle}>나의 가계부</p>
      </div>

      <div className={styles.menuCards}>
        <Link href='/expense' className={styles.card}>
          <div className={styles.icon}>📊</div>
          <h2>지출 관리</h2>
          <p>수입/지출 입력 및 관리</p>
        </Link>

        <Link href='/stats' className={styles.card}>
          <div className={styles.icon}>📈</div>
          <h2>통계 보기</h2>
          <p>지출 분석 및 리포트</p>
        </Link>

        <Link href='/settings' className={styles.card}>
          <div className={styles.icon}>⚙️</div>
          <h2>설정</h2>
          <p>카테고리 및 환경설정</p>
        </Link>
      </div>
    </div>
  );
}
