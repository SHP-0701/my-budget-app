/*
**********************************************************************************************************************************************
  ▢ 작성일자: 2025. 11. 17.(월)
  ▢ 파일명: /components/ExpenseScheduleModal.js
  ▢ 내용
    - 지출 입력(/expense/input/page.js)에서 지출 예정 내역을 등록(+수정)할 때 사용할 모달
    - 모달 파라미터
      · isOpen: 모달을 열고 닫는 인자
      · onClose: 모달을 닫을 때
      · mode: 등록/수정 분기
      · initialData: '수정'모드일 시 수정을 위한 데이터
      · onSave: 부모 컴포넌트로 데이터 전달할 때 사용하는 인자
  ▢ 작성자: 박수훈(shpark)
**********************************************************************************************************************************************
*/

'use client';
import { useState, useEffect } from 'react';
import CommonModal from '@/components/CommonModal';
import { FaCalendarAlt, FaMoneyBillWave, FaStickyNote } from 'react-icons/fa';
import styles from '@/styles/ExpenseScheduleModal.module.css';

export default function ExpenseScheduleModal({
  isOpen,
  onClose,
  mode,
  initialData,
  onSave,
}) {
  const [formData, setFormData] = useState({
    data: '',
    name: '',
    amount: '',
  });

  // 모달이 열릴 때 데이터 초기화
  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialData) {
        // 수정모드(기존 데이터로 formData 채움)
        setFormData({
          date: initialData.date,
          name: initialData.name,
          amount: initialData.amount,
        });
      } else {
        // 등록 모드인 경우 빈 폼
        setFormData({
          date: new Date().toISOString().split('T')[0],
          name: '',
          amount: '',
        });
      }
    }
  }, [isOpen, mode, initialData]);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 저장 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사 실시
    if (!formData.name.trim()) {
      alert('내용을 입력해주세요');
      return;
    }

    if (!formData.amount || formData.amount <= 0) {
      alert('금액을 입력해주세요');
      return;
    }

    // 부모 컴포넌트(/expense/input/page.js)로 데이터 전달
    onSave(formData);
    onClose();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'add' ? '지출 예정 추가' : '지출 예정 수정'}
      width='500px'
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        {/** 날짜 입력 */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <FaCalendarAlt className={styles.icon} />
            날짜
          </label>
          <input
            type='date'
            name='date'
            value={formData.date}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        {/** 내용 입력 */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <FaStickyNote className={styles.icon} />
            내용
          </label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='예시: 통신비, 보험료 등'
            className={styles.input}
            required
          />
        </div>

        {/* 금액 입력 */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <FaMoneyBillWave className={styles.icon} />
            금액
          </label>
          <div className={styles.amountWrapper}>
            <input
              type='number'
              name='amount'
              value={formData.amount}
              onChange={handleChange}
              placeholder='0'
              className={styles.input}
              min='0'
              required
            />
            <span className={styles.unit}>원</span>
          </div>
        </div>

        {/* 버튼 그룹 */}
        <div className={styles.buttonGroup}>
          <button
            type='button'
            onClick={onClose}
            className={`${styles.button} ${styles.cancelButton}`}
          >
            취소
          </button>
          <button
            type='submit'
            className={`${styles.button} ${styles.submitButton}`}
          >
            {mode === 'add' ? '추가' : '수정'}
          </button>
        </div>
      </form>
    </CommonModal>
  );
}
