/*
**********************************************************************************************************************************************
  ▢ 작성일자: 2025. 11. 21.(금)
  ▢ 파일명: /expense/settings/page.js
  ▢ 내용:
    - 설정 페이지(/settings로 페이지 호출)
    - 탭 형식의 레이아웃 구성(사용자 프로필 / 카테고리 관리 / 테마 및 화면 설정 / 데이터 관리)
  ▢ 작성자: 박수훈(shpark)
**********************************************************************************************************************************************
*/

'use client';
import { useState } from 'react';
import MenuLayout from '@/components/MenuLayout';
import styles from '@/styles/Settings.module.css';
import { useRouter } from 'next/navigation';
import { IoMdArrowBack } from 'react-icons/io';
import { FaUser, FaFolder, FaPalette, FaDatabase } from 'react-icons/fa';

export default function Settings() {
  const router = useRouter();

  // 현재 활성된 탭 상태
  const [activeTab, setActiveTab] = useState('profile');

  // 더미 데이터(사용자 프로필)
  const [profile, setProfile] = useState({
    name: '박수훈',
    email: 'shpark@test.com',
    phone: '010-1234-5678',
    profileImage: null,
  });

  // 더미 데이터(카테고리)
  const [categories, setCategories] = useState({
    expense: ['식비', '교통', '쇼핑', '의료', '문화', '기타'],
    income: ['급여', '상여', '기타'],
  });

  // 더미 데이터(테마 설정)
  const [themeSettings, setThemeSettings] = useState({
    theme: 'light', // light & dark
    language: 'ko',
    currency: 'KRW',
  });

  // 탭 목록
  const tabs = [
    { id: 'profile', label: '사용자 프로필', icon: <FaUser /> },
    { id: 'category', label: '카테고리 관리', icon: <FaFolder /> },
    { id: 'theme', label: '테마·화면 설정', icon: <FaPalette /> },
    { id: 'data', label: '데이터 관리', icon: <FaDatabase /> },
  ];

  // 프로필 입력 변경
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 카테고리 삭제
  const handleDeleteCategory = (type, category) => {
    // 추후 내부 로직 구현...
    console.log(`DELETE ${type}: ${category}`);
  };

  // 카테고리 추가
  const handleAddCategory = (type) => {
    // 추후 내부 로직 구현...
    console.log(`Add ${type} category`);
  };

  // 테마 변경
  const handleThemeChange = (e) => {
    const { name, value } = e.target;
    setThemeSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <MenuLayout>
      <div className={styles.container}>
        {/** 헤더(header) 영역 */}
        <div className={styles.header}>
          <h1 className={styles.title}>설정</h1>
          <p className={styles.subtitle}>사용자 설정을 관리하세요</p>
        </div>

        {/** 탭 메뉴 */}
        <div className={styles.tabMenu}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${styles.tabButton} ${
                activeTab === tab.id ? styles.tabButtonActive : ''
              }`}
              type='button'
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/** 콘텐츠 영역 */}
        <div className={styles.contentArea}>
          {/** 사용자 프로필 탭 */}
          {activeTab === 'profile' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>사용자 프로필</h2>

              <div className={styles.formGroup}>
                <label className={styles.label}>프로필 사진</label>
                <div className={styles.profileImageWrapper}>
                  <div className={styles.profileImage}>
                    {profile.profileImage ? (
                      <img src={profile.profileImage} alt='프로필' />
                    ) : (
                      <FaUser className={styles.defaultProfileIcon} />
                    )}
                  </div>
                  <button className={styles.uploadButton} type='button'>
                    사진 변경
                  </button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>이름</label>
                <input
                  type='text'
                  name='name'
                  value={profile.name}
                  onChange={handleProfileChange}
                  className={styles.input}
                  placeholder='이름을 입력하세요'
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>이메일</label>
                <input
                  type='email'
                  name='email'
                  value={profile.email}
                  onChange={handleProfileChange}
                  className={styles.input}
                  placeholder='이메일을 입력하세요'
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>전화번호</label>
                <input
                  type='tel'
                  name='phone'
                  value={profile.phone}
                  onChange={handleProfileChange}
                  className={styles.input}
                  placeholder='전화번호를 입력하세요'
                />
              </div>

              <button className={styles.saveButton} type='button'>
                저장하기
              </button>
            </div>
          )}

          {/** 카테고리 관리 탭 */}
          {activeTab === 'category' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>카테고리 관리</h2>

              <div className={styles.categorySection}>
                <h3 className={styles.categoryTitle}>지출 카테고리</h3>
                <div className={styles.categoryList}>
                  {categories.expense.map((category) => (
                    <div key={category} className={styles.categoryItem}>
                      <span>{category}</span>
                      <button
                        onClick={() =>
                          handleDeleteCategory('expense', category)
                        }
                        className={styles.deleteButton}
                        type='button'
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddCategory('expense')}
                    className={styles.addCategoryButton}
                    type='button'
                  >
                    + 카테고리 추가
                  </button>
                </div>
              </div>

              <div className={styles.categorySection}>
                <h3 className={styles.categoryTitle}>수입 카테고리</h3>
                <div className={styles.categoryList}>
                  {categories.income.map((category) => (
                    <div key={category} className={styles.categoryItem}>
                      <span>{category}</span>
                      <button
                        onClick={() => handleDeleteCategory('income', category)}
                        className={styles.deleteButton}
                        type='button'
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddCategory('income')}
                    className={styles.addCategoryButton}
                    type='button'
                  >
                    + 카테고리 추가
                  </button>
                </div>
              </div>
            </div>
          )}

          {/** 테마·화면 설정 탭 */}
          {activeTab === 'theme' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>테마·화면 설정</h2>

              <div className={styles.formGroup}>
                <label className={styles.label}>테마</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input
                      type='radio'
                      name='theme'
                      value='light'
                      checked={themeSettings.theme === 'light'}
                      onChange={handleThemeChange}
                    />
                    <span>라이트 모드</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type='radio'
                      name='theme'
                      value='dark'
                      checked={themeSettings.theme === 'dark'}
                      onChange={handleThemeChange}
                    />
                    <span>다크 모드</span>
                  </label>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>언어</label>
                <select
                  name='language'
                  value={themeSettings.language}
                  onChange={handleThemeChange}
                  className={styles.select}
                >
                  <option value='ko'>한국어</option>
                  <option value='en'>English</option>
                  <option value='ja'>日本語</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>통화</label>
                <select
                  name='currency'
                  value={themeSettings.currency}
                  onChange={handleThemeChange}
                  className={styles.select}
                >
                  <option value='KRW'>원 (₩)</option>
                  <option value='USD'>달러 ($)</option>
                  <option value='EUR'>유로 (€)</option>
                  <option value='JPY'>엔 (¥)</option>
                </select>
              </div>

              <button className={styles.saveButton} type='button'>
                저장하기
              </button>
            </div>
          )}

          {/** 데이터 관리 탭 */}
          {activeTab === 'data' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>데이터 관리</h2>

              <div className={styles.dataSection}>
                <h3 className={styles.dataTitle}>데이터 내보내기</h3>
                <p className={styles.dataDescription}>
                  모든 지출/수입 데이터를 JSON 파일로 내보냅니다.
                </p>
                <button className={styles.dataButton} type='button'>
                  데이터 내보내기
                </button>
              </div>

              <div className={styles.dataSection}>
                <h3 className={styles.dataTitle}>데이터 가져오기</h3>
                <p className={styles.dataDescription}>
                  이전에 내보낸 JSON 파일을 불러옵니다.
                </p>
                <button className={styles.dataButton} type='button'>
                  데이터 가져오기
                </button>
              </div>

              <div className={styles.dataSection}>
                <h3 className={styles.dataTitle}>전체 데이터 삭제</h3>
                <p className={styles.dataDescription}>
                  모든 데이터를 영구적으로 삭제합니다. 이 작업은 되돌릴 수
                  없습니다.
                </p>
                <button className={styles.dangerButton} type='button'>
                  전체 데이터 삭제
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MenuLayout>
  );
}
