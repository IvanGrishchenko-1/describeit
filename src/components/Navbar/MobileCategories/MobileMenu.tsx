import { ActionIcon, createStyles } from '@mantine/core';
import { IconMenu2 } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import React from 'react';
import { useSetRecoilState } from 'recoil';

import { mobileMenuState } from '../../../atoms/mobileMenuAtom';

type MobileMenuProps = {
  actionIconClasses: string;
};

const useStyles = createStyles(theme => ({
  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));
export const MobileMenu: React.FC<MobileMenuProps> = ({
  actionIconClasses,
}) => {
  const { classes } = useStyles();
  const openMobileMenu = useSetRecoilState(mobileMenuState);

  return (
    <ActionIcon
      component={motion.button}
      size="lg"
      className={actionIconClasses && classes.hiddenDesktop}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => openMobileMenu(prevValue => !prevValue)}
    >
      <IconMenu2 size={20} stroke={1.5} />
    </ActionIcon>
  );
};
