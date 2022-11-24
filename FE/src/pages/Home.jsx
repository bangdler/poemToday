import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import Header from '@/components/Header';
import PoemCard from '@/components/PoemCard';
import { AuthDispatchContext, useAuth } from '@/context/AuthProvider';

export default function Home() {
  const { setUser } = useContext(AuthDispatchContext);
  const { checkUser } = useAuth();

  useEffect(() => {
    try {
      const user = localStorage.getItem('user');
      if (!user) return;
      setUser({ user: JSON.parse(user) });
      checkUser();
    } catch (e) {
      console.log('localStorage is not working');
    }
  }, []);

  return (
    <>
      <Header />
      <S_Div>
        <PoemCard
          title={'qewe! qewe!! qewe!!! qewe!! 하하ㅣㅏ'}
          category={[
            {
              checked: true,
              name: '자작시',
              color: '#FFDC3C',
              _id: '637cebd1a50abd5b937113eb',
            },
            {
              checked: true,
              name: '사랑시',
              color: '#FF5050',
              _id: '637cebd1a50abd5b937113ec',
            },
            {
              checked: true,
              name: '감성시',
              color: '#9EF048',
              _id: '637cebd1a50abd5b937113ed',
            },
          ]}
          body={
            '<h1>아주아주 큰 글씨와 dfdfdfd</h1><h1>아주아주 큰 글씨와</h1><h1>아주아주 큰 글씨와</h1><p>아주아주 작은 글씨</p><blockquote>그리고 이건 코드 블록...</blockquote><pre class="ql-syntax" spellcheck="false">ㅇㅏ니이건왜 아 가 안쳐지냐...\n</pre><p><span style="color: rgb(255, 153, 0);">정말 오렌지 군단!</span></p>...'
          }
        />
      </S_Div>
      <S_Div2></S_Div2>
    </>
  );
}

const S_Div = styled.div`
  height: 1000px;
`;

const S_Div2 = styled.div`
  background-color: #ffd700;
  height: 1000px;
`;
