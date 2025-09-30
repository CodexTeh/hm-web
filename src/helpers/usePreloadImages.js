import { useState, useEffect } from 'react';

export function useImagesPreloaded(urls) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!urls?.length) {
      setReady(false);
      return;
    }

    let isCancelled = false;
    let loaded = 0;

    if (urls.length === 0) {
      setReady(true);
      return;
    }

    const onLoad = () => {
      loaded++;
      if (loaded === urls.length && !isCancelled) {
        setReady(true);
      }
    };

    urls.forEach(url => {
      const img = new window.Image();
      img.onload = onLoad;
      img.onerror = onLoad;
      img.src = url;
    });

    return () => {
      isCancelled = true;
    };
  }, [urls]);

  return ready;
}