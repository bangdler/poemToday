import React from 'react';

import Thumbnail from '@/assets/poemToday_thumbnail.jpeg';
import MetaHead from '@/components/common/MetaHead';

export default function BaseMeta() {
  const meta = {
    title: 'Poem Today',
    description: '시를 쓰고 공유하는 웹사이트입니다.',
    keywords: 'PoemToday, Poem',
    ogSiteName: '오늘의 시',
    ogDescription: '오늘의 시를 감상하고 나만의 시도 작성해보세요!',
    ogImage: Thumbnail,
    ogUrl: 'https://poem-today.link/',
  };
  return <MetaHead {...meta} />;
}
