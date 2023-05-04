import { Group, Modal, useMantineTheme } from '@mantine/core';
import React from 'react';

import { ThumbnailCard } from '../../Card/ThumbnailCard';

type ThumbnailTemplateModalProps = {
  opened: boolean;
  close: () => void;
  image: string;
  title: string;
  category: string;
};

export const ThumbnailTemplateModal: React.FC<ThumbnailTemplateModalProps> = ({
  opened,
  close,
  image,
  title,
  category,
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
        <ThumbnailCard image={image} title={title} category={category} />
      </Group>
    </Modal>
  );
};
