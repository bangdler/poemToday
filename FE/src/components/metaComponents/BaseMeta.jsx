import React from 'react';

import Thumbnail from '@/assets/poemToday_thumbnail.jpeg';
import MetaHead from '@/components/common/MetaHead';

export default function BaseMeta() {
  const meta = {
    description: '시를 쓰고 공유하는 사이트',
    keywords: 'PoemToday, Poem',
    ogSiteName: '오늘의 시',
    ogDescription: '오늘의 시를 감상하고 작성해보세요!',
    ogImage: Thumbnail,
  };
  return <MetaHead {...meta} />;
}
