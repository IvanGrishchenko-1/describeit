import { Group, Modal, useMantineTheme } from '@mantine/core';
import React from 'react';

import { TextCard } from '../../Card/TextCard';

type TextTemplateModalProps = {
  opened: boolean;
  close: () => void;
  title: string;
  description: string;
};

export const TextTemplateModal: React.FC<TextTemplateModalProps> = ({
  opened,
  close,
  title,
  description,
}) => {
  const theme = useMantineTheme();

  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      overlayProps={{
        color:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
      transitionProps={{ transition: 'slide-down', duration: 300 }}
    >
      <Group position="center">
        <TextCard title={title} description={description} />
      </Group>
    </Modal>
  );
};
