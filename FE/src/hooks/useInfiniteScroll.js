import { useEffect, useState } from 'react';

import { throttleByAnimationFrame } from '@/utils/util';

export function useInfiniteScrollByScrollEvent({ fetchCallback }) {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = throttleByAnimationFrame(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (clientHeight + scrollTop >= scrollHeight) {
      setIsFetching(true);
    }
  });

  useEffect(() => {
    setIsFetching(true);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchCallback();
  }, [isFetching]);

  return [isFetching, setIsFetching];
}

export function useInfiniteScrollByIntersection({ fetchCallback, target, options }) {
  const [isFetching, setIsFetching] = useState(false);
  const intersectionCallback = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setIsFetching(true);
      }
    });
  };

  useEffect(() => {
    if (!target) return;
    const observer = new IntersectionObserver(intersectionCallback, options);
    observer.observe(target);
    return () => observer?.disconnect(target);
  }, [target]);

  useEffect(() => {
    if (!isFetching) return;
    fetchCallback();
  }, [isFetching]);

  return [isFetching, setIsFetching];
}
