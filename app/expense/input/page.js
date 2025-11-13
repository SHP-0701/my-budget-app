/*
**********************************************************************************************************************************************
  ▢ 작성일자: 2025. 11. 11.(화)
  ▢ 파일명: /expense/input/page.js
  ▢ 내용
    - 지출 관리(expense) 중 지출/수입 입력을 담당(/expense/input 으로 페이지 호출)
    - 사이드메뉴에서 '지출 입력' 메뉴를 선택하면 출력되는 페이지(또는 지출 관리 대시보드 내 빠른 메뉴 버튼 '지출 입력')
  ▢ 작성자: 박수훈(shpark)
**********************************************************************************************************************************************
*/

'use client';
import { useState } from 'react';
import MenuLayout from '@/components/MenuLayout';
import styles from '@/styles/ExpenseInput.module.css';
import { useRouter } from 'next/navigation';

export default function ExpenseInput() {
  const router = useRouter();

  // 입력 폼 상태(state) 관리
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0], // 오늘 날짜
    type: 'expense', // expense(지출) or income(수입)
    category: '',
    amount: '',
    description: '',
  });

  // 카테고리 목록(지출/수입 별)
  const categories = {
    expense: ['식비', '교통', '쇼핑', '의료', '문화', '기타'],
    income: ['급여', '상여', '기타'],
  };

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 구분(지출/수입) 변경 시 카테고리 초기화
  const handleTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      type,
      category: '', // 카테고리 초기화
    }));
  };

  // 저장 버튼 클릭 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    // 데이터 유효성 검사
    if (!formData.category) {
      alert('카테고리를 선택해주세요!');
      return;
    }

    if (!formData.amount || formData.amount <= 0) {
      alert('금액을 입력해주세요!');
      return;
    }

    // API 호출 후 데이터 저장
    console.log('[/expense/input/page.js] 저장할 데이터: ', formData);
    alert('저장 완료');
    router.push('/expense');
  };

  // 취소 버튼 핸들러
  const handleCancel = () => {
    router.push('/expense');
  };

  return (
    <MenuLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>지출 입력</h1>
        <p className={styles.subtitle}>수입과 지출을 기록하세요</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/** 첫 번째 행: 날짜 + 구분(지출/수입) */}
          <div className={styles.row}>
            {/** 날짜 */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>날짜</label>
              <input
                type='date'
                name='date'
                value={formData.date}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            {/** 구분 */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>구분</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type='radio'
                    name='type'
                    value='expense'
                    checked={formData.type === 'expense'}
                    onChange={() => handleTypeChange('expense')}
                  />
                  <span>지출</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type='radio'
                    name='type'
                    value='income'
                    checked={formData.type === 'income'}
                    onChange={() => handleTypeChange('income')}
                  />
                  <span>수입</span>
                </label>
              </div>
            </div>
          </div>

          {/** 두 번째 행: 카테고리 + 금액 */}
          <div className={styles.row}>
            {/** 카테고리 */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>카테고리</label>
              <select
                name='category'
                value={formData.category}
                onChange={handleChange}
                className={styles.select}
              >
                <option value=''>선택하세요</option>
                {categories[formData.type].map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/** 금액 */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>금액</label>
              <div className={styles.amountWrapper}>
                <input
                  type='number'
                  name='amount'
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder='0'
                  className={styles.input}
                  min='0'
                />
                <span className={styles.unit}>원</span>
              </div>
            </div>
          </div>

          {/** 세 번째 행: 내용(전체 너비 사용) */}
          <div className={styles.fullRow}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>내용 및 메모</label>
              <textarea
                name='description'
                value={formData.description}
                onChange={handleChange}
                placeholder='상세 내용을 입력하세요(선택사항)'
                className={styles.textarea}
                rows={4}
              />
            </div>
          </div>
        </form>
      </div>
    </MenuLayout>
  );
}
