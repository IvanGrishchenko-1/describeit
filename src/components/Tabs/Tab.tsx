import { Flex, Tabs, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import React from 'react';

export type TabProps = {
  value: string;
  i18nKey: string;
  icon: JSX.Element;
};

export const Tab: React.FC<TabProps> = ({ value, i18nKey, icon }) => {
  const { t } = useTranslation();

  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Tabs.Tab value={value}>
        <Flex direction="row" align="center" justify="center" gap="xl">
          {icon}
          <Title order={3}>{t(i18nKey)}</Title>
        </Flex>
      </Tabs.Tab>
    </motion.div>
  );
};
