/*
*****************************************************************************************
  ▢ (작성일자) 2025. 12. 23.(화)
  ▢ (페이지명) /app/login/page.js 
  ▢ (내용) 
    - /app/page.js 에서 바로 리다이렉트 시키는 로그인 페이지
    - 로그인 처리 후 지출관리 대시보드(/app/expense/page.js)로 이동
  ▢ (작성자) 박수훈(shpark)
*****************************************************************************************
*/

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/Login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // 테스트용 Error 발생
    if (password.length < 4) {
      setErrorMsg('비밀번호는 4자리 이상이어야 합니다.');
      setLoading(false);
      return;
    }

    // dummy login logic(1초 뒤 무조건 로그인 성공)
    console.log(
      `[/login/page.js] 로그인 시도: (이메일)${email} / (패스워드)${password}`
    );

    setTimeout(() => {
      alert('로그인 성공(Test)');
      router.push('/expense'); // 지출관리 대시보드로 이동
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>SH Budget</h1>
        <p className={styles.subtitle}>로그인이 필요합니다.</p>
      </div>

      <div className={styles.loginBox}>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type='email'
              placeholder='이메일'
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type='password'
              placeholder='비밀번호'
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMsg && <div className={styles.error}>{errorMsg}</div>}

          <button type='submit' className={styles.button} disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
}
