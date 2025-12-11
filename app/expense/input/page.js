/*
**********************************************************************************************************************************************
  ▢ 작성일자: 2025. 11. 11.(화)
  ▢ 파일명: /expense/input/page.js
  ▢ 내용
    - 지출 관리(expense) 중 지출/수입 입력을 담당(/expense/input 으로 페이지 호출)
    - 사이드메뉴에서 '지출 입력' 메뉴를 선택하면 출력되는 페이지(또는 지출 관리 대시보드 내 빠른 메뉴 버튼 '지출 입력')
    - 좌측(입력 폼 영역) + 우측(지출 예정 내역 카드) 화면 구성
  ▢ 작성자: 박수훈(shpark)
**********************************************************************************************************************************************
*/

'use client';
import { useState } from 'react';
import MenuLayout from '@/components/MenuLayout';
import ExpenseScheduleModal from '@/components/ExpenseScheduleModal';
import styles from '@/styles/ExpenseInput.module.css';
import { useRouter } from 'next/navigation';
import {
  FaCalendarAlt,
  FaMoneyBillWave,
  FaListAlt,
  FaStickyNote,
  FaCalendarCheck,
  FaTimes,
  FaEdit,
  FaPlus,
} from 'react-icons/fa';
import { IoMdArrowBack } from 'react-icons/io';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { formatDate } from '@/utils/date';

export default function ExpenseInput() {
  const router = useRouter();

  // 모달 상태(state) 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // add(등록) or edit(수정)
  const [editItem, setEditItem] = useState(null); // 지출 예정 내역 수정을 위한 state

  // 입력 폼 상태(state) 관리
  const [formData, setFormData] = useState({
    date: formatDate(new Date()),
    type: 'expense', // expense(지출) or income(수입)
    category: '',
    amount: '',
    description: '',
  });

  // 카테고리 목록(지출/수입 별)
  const categories = {
    expense: ['식비', '교통', '쇼핑', '의료', '문화', '기타'],
    income: ['급여', '배당금', '상여', '기타'],
  };

  // 이번 달 지출 예정 내역(더미 데이터)
  const [scheduleExpenses, setScheduleExpenses] = useState([
    { id: 1, date: '2025-11-09', name: '넷플릭스 구독료', amount: 14500 },
    { id: 2, date: '2025-11-10', name: '후불교통대금', amount: 67500 },
    { id: 3, date: '2025-11-21', name: '통신비', amount: 86500 },
    { id: 4, date: '2025-11-25', name: '보험료', amount: 145000 },
    { id: 5, date: '2025-11-09', name: '넷플릭스 구독료', amount: 14500 },
    { id: 6, date: '2025-11-10', name: '후불교통대금', amount: 67500 },
    { id: 7, date: '2025-11-21', name: '통신비', amount: 86500 },
    { id: 8, date: '2025-11-25', name: '보험료', amount: 145000 },
    { id: 9, date: '2025-11-10', name: '후불교통대금', amount: 67500 },
    /* 
    { id: 10, date: '2025-11-21', name: '통신비', amount: 86500 },
    { id: 11, date: '2025-11-25', name: '보험료', amount: 145000 },
    */
  ]);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // DatePicker 전용 handler
  const handleDateChange = (date) => {
    const formattedDate = formatDate(date);

    setFormData((prev) => ({
      ...prev,
      date: formattedDate,
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

  // 지출 예정 내역 삭제 핸들러
  const handleDeleteScheduleExpenses = (id) => {
    // 사용자에게 확인 받기
    if (confirm('해당 예정 내역을 삭제하시겠습니까?')) {
      setScheduleExpenses((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // 모달(ExpenseScheduleModal)에서 저장 버튼 클릭 시 실행되는 핸들러
  const handleModalSave = (formData) => {
    if (modalMode === 'add') {
      // 지출 예정 내역 추가
      const newItem = {
        id: Date.now(),
        date: formData.date,
        name: formData.name,
        amount: formData.amount,
      };

      setScheduleExpenses((prev) => [...prev, newItem]);
      alert('지출 예정 추가 완료');
    } else if (modalMode === 'edit') {
      // 지출 예정 내역 수정
      setScheduleExpenses((prev) =>
        prev.map((item) =>
          item.id === editItem.id
            ? {
                ...item,
                date: formData.date,
                name: formData.name,
                amount: formData.amount,
              }
            : item
        )
      );
      alert('지출 예정이 수정되었습니다.');
    }
  };

  return (
    <MenuLayout>
      <div className={styles.pageContainer}>
        <div className={styles.header}>
          {/** 대시보드로 돌아가기 버튼 */}
          <button
            onClick={handleCancel}
            className={styles.backButton}
            type='button'
          >
            <IoMdArrowBack />
            대시보드
          </button>
          <h1 className={styles.title}>지출 입력</h1>
          <p className={styles.subtitle}>수입과 지출을 기록하세요</p>
        </div>

        {/** 메인 컨텐츠 영역: 왼쪽(입력폼) + 오른쪽(지출예정내역) */}
        <div className={styles.mainContent}>
          {/** 입력 폼을 감싸는 섹션 */}
          <div className={styles.formSection}>
            <form onSubmit={handleSubmit} className={styles.form}>
              {/** 첫 번째 행: 날짜 + 구분(지출/수입) */}
              <div className={styles.row}>
                {/** 날짜 */}
                <div className={styles.inputGroup}>
                  <label className={styles.label}>
                    <FaCalendarAlt className={styles.icon} />
                    날짜
                  </label>

                  {/** input type='date' 대신 datepicker 사용 */}
                  <DatePicker
                    selected={formData.date ? new Date(formData.date) : null}
                    onChange={handleDateChange}
                    dateFormat={'yyyy-MM-dd'}
                    className={styles.input}
                    placeholderText='날짜를 선택하세요'
                    locale={ko}
                  />
                </div>

                {/** 구분 */}
                <div className={styles.inputGroup}>
                  <label className={styles.label}>
                    <FaMoneyBillWave className={styles.icon} />
                    구분
                  </label>
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
                  <label className={styles.label}>
                    <FaListAlt className={styles.icon} />
                    카테고리
                  </label>
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
                    />
                    <span className={styles.unit}>원</span>
                  </div>
                </div>
              </div>

              {/** 세 번째 행: 내용(전체 너비 사용) */}
              <div className={styles.fullRow}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>
                    <FaStickyNote className={styles.icon} />
                    내용 및 메모
                  </label>
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

              {/** 버튼 영역 */}
              <div className={styles.buttonGroup}>
                <button
                  type='button'
                  onClick={handleCancel}
                  className={`${styles.button} ${styles.cancelButton}`}
                >
                  취소
                </button>
                <button
                  type='submit'
                  onClick={handleSubmit}
                  className={`${styles.button} ${styles.submitButton}`}
                >
                  저장
                </button>
              </div>
            </form>
          </div>

          {/** 지출 예정 내역 섹션 */}
          <div className={styles.scheduleSection}>
            {/** 제목 및 추가 버튼 감싸는 래퍼(Wrapper) */}
            <div className={styles.scheduleTitleWrapper}>
              <h2 className={styles.scheduleTitle}>
                <FaCalendarCheck className={styles.icon} />
                이번 달 지출 예정
              </h2>
              <button
                className={styles.addButton}
                onClick={() => {
                  setModalMode('add');
                  setEditItem(null);
                  setIsModalOpen(true);
                }}
                type='button'
                aria-label='지출 예정 추가'
              >
                <FaPlus />
              </button>
            </div>

            <div className={styles.scheduleList}>
              {scheduleExpenses.length > 0 ? (
                scheduleExpenses.map((item) => (
                  <div
                    key={item.id}
                    className={styles.scheduleCard}
                    data-card-id={item.id}
                  >
                    <div className={styles.cardButtons}>
                      <button
                        className={styles.editButton}
                        onClick={() => {
                          setModalMode('edit');
                          setEditItem(item);
                          setIsModalOpen(true);
                        }}
                        aria-label='수정'
                      >
                        <FaEdit />
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDeleteScheduleExpenses(item.id)}
                        aria-label='삭제'
                      >
                        <FaTimes />
                      </button>
                    </div>

                    <div className={styles.scheduleDate}>{item.date}</div>
                    <div className={styles.scheduleName}>{item.name}</div>
                    <div className={styles.scheduleAmount}>{item.amount}</div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyMessage}>
                  예정 된 지출 내역이 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/** 모달 영역 */}
      <ExpenseScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        initialData={editItem}
        onSave={handleModalSave}
      />
    </MenuLayout>
  );
}
