"use client";

import * as React from "react";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";

export default function EmotionCacheProvider(props: {
  children: React.ReactNode;
}) {
  const { options, cache, flush } = useEmotionCache();

  useServerInsertedHTML(() => {
    const entries = flush();
    if (entries.length === 0) {
      return null;
    }
    return (
      <>
        {entries.map((entry) => (
          <style
            key={entry.key}
            data-emotion={`${entry.key} ${entry.ids.join(" ")}`}
            dangerouslySetInnerHTML={{ __html: entry.css }}
          />
        ))}
      </>
    );
  });

  return <CacheProvider value={cache}>{props.children}</CacheProvider>;
}

function useEmotionCache() {
  const cache = React.useMemo(() => {
    return createCache({ key: "css", prepend: true });
  }, []);

  const flush = () => {
    const entries = Object.entries(cache.inserted);
    const serialized = entries.map(([key, value]) => {
      const ids = Object.keys(value);
      const css = ids.map((id) => value[id]).join("");
      return { key: cache.key, ids, css };
    });
    cache.inserted = {};
    return serialized;
  };

  return {
    cache,
    flush,
    options: cache,
  };
}
