import { ActionIcon, useMantineTheme } from '@mantine/core';
import { IconUserPlus } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import React from 'react';
import { useSetRecoilState } from 'recoil';

import { authModalState } from '../../../atoms/authModalAtom';

export type AuthProps = {
  mobileClasses: string;
};

export const MobileAuth: React.FC<AuthProps> = ({ mobileClasses }) => {
  const setModalState = useSetRecoilState(authModalState);
  const theme = useMantineTheme();

  return (
    <ActionIcon
      component={motion.button}
      size="lg"
      className={mobileClasses}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setModalState(prev => ({ ...prev, open: true }))}
    >
      <IconUserPlus
        size={20}
        stroke={1.5}
        color={
          theme.colorScheme === 'dark'
            ? theme.colors.orange[7]
            : theme.colors.indigo[7]
        }
      />
    </ActionIcon>
  );
};
