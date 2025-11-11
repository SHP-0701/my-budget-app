/*
**********************************************************************************************************************************************
  ▢ 작성일자: 2025. 11. 11.(화)
  ▢ 파일명: MenuLayout.js
  ▢ 내용: 각 메뉴(/expense/page.js, /stats/page.js, /settings/page.js)에 공통적으로 적용되는 레이아웃을 작성(왼쪽 사이드메뉴 + 오른쪽 각 메뉴별 내용)
  ▢ 작성자: 박수훈(shpark)
**********************************************************************************************************************************************
*/

'use client';
import { useRouter } from 'next/navigation';
import {
  FaHome,
  FaPencilAlt,
  FaList,
  FaChartLine,
  FaCog,
} from 'react-icons/fa';
import styles from '@/styles/MenuLayout.module.css';

export default function MenuLayout({ children }) {
  const router = useRouter();

  const menuItems = [
    { icon: <FaHome />, label: '홈', path: '/' },
    { icon: <FaPencilAlt />, label: '지출 입력', path: '/expense/input' },
    { icon: <FaList />, label: '지출 내역', path: '/expense/list' },
    { icon: <FaChartLine />, label: '통계/분석', path: '/stats' },
    { icon: <FaCog />, label: '설정', path: '/settings' },
  ];

  return (
    <div className={styles.layout}>
      {/* 왼쪽 사이드바(sidebar) */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>SH Budget</h2>
        </div>
        <nav className={styles.nav}>
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => router.push(item.path)}
              className={styles.navItem}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* 오른쪽 메인 콘텐츠 */}
      <main className={styles.content}>{children}</main>
    </div>
  );
}
