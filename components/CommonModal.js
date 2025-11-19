/*
**********************************************************************************************************************************************
  ▢ 작성일자: 2025. 11. 17.(월)
  ▢ 파일명: /components/CommonModal.js
  ▢ 내용
    - 앱 내의 모달페이지들이 공통으로 쓰는 공통 모달 레이아웃
    - 레이아웃 공통 prop
      · isOpen(): 모달 열고 닫는 인자
      · onClose(): 모달을 닫기 위한 인자
      · title: 모달의 제목
      · children: 모달의 공통부분을 제외한 모달마다 들어가는 내용(고정 X)
      · width: 모달창의 기본 너비(500px)
  ▢ 작성자: 박수훈(shpark)
**********************************************************************************************************************************************
*/

import { FaTimes } from 'react-icons/fa';
import styles from '@/styles/CommonModal.module.css';

export default function CommonModal({
  isOpen,
  onClose,
  title,
  children,
  width = '500px',
}) {
  // 모달이 닫혀있으면 렌더링 미실시
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClose={onClose}>
      <div
        className={styles.modalContent}
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
      >
        {/** 헤더 영역 */}
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{title}</h3>
          <button
            className={styles.modalCloseButton}
            onClick={onClose}
            type='button'
            aria-label='닫기'
          >
            <FaTimes />
          </button>
        </div>

        {/** 본문 영역(children으로 받음) */}
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
}
