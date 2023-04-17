import { createEmotionCache } from '@mantine/core';

export const ltrCache = createEmotionCache({
  key: 'mantine-ltr',
  prepend: true,
});
