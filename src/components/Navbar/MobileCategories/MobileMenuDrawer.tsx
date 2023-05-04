import {
  createStyles,
  Drawer,
  Flex,
  Stack,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useRecoilState } from 'recoil';

import { mobileMenuState } from '../../../atoms/mobileMenuAtom';
import { DefaultValue, tabsAtom } from '../../../atoms/tabsAtom';

const useStyles = createStyles(theme => ({
  button: {
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

export const MobileMenuDrawer: React.FC = () => {
  const [openMenu, setOpenMenu] = useRecoilState(mobileMenuState);
  const [tabs, setTabs] = useRecoilState(tabsAtom);
  const { t } = useTranslation();
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const handleTabClick = (value: string): void => {
    setTabs(prevValue => ({
      ...prevValue,
      defaultValue: value as DefaultValue,
    }));
    setOpenMenu(false);
  };

  return (
    <Drawer
      opened={openMenu}
      onClose={() => setOpenMenu(false)}
      overlayProps={{ opacity: 0.5, blur: 4 }}
      size={300}
      transitionProps={{ transition: 'rotate-right', duration: 150 }}
    >
      <Stack w="100%" py="xl" px="sm">
        {tabs.tabs.map(({ value, i18nKey, icon }, index) => (
          <motion.div
            key={`tab-${index}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleTabClick(value)}
          >
            <Flex
              sx={{
                cursor: 'pointer',
                borderRadius: theme.radius.sm,
                padding: theme.spacing.sm,
                backgroundColor:
                  tabs.defaultValue === value
                    ? theme.colorScheme === 'dark'
                      ? theme.colors.orange[8]
                      : theme.colors.indigo[6]
                    : 'transparent',
                color:
                  theme.colorScheme === 'dark'
                    ? tabs.defaultValue === value
                      ? '#fff'
                      : theme.colors.dark[0]
                    : tabs.defaultValue === value
                    ? '#fff'
                    : '#000',
              }}
              direction="row"
              justify="flex-start"
              align="center"
              gap="lg"
              className={!(tabs.defaultValue === value) ? classes.button : ''}
            >
              {icon}
              <Title order={3}>{t(i18nKey)}</Title>
            </Flex>
          </motion.div>
        ))}
      </Stack>
    </Drawer>
  );
};
