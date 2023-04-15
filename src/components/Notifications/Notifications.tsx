import { IconCheck, IconX } from '@tabler/icons-react';
import { ReactNode } from 'react';

type NotificationsProps = {
  withCloseButton?: true;
  autoClose?: 5000;
  color: string;
  icon: ReactNode;
};

export const success: NotificationsProps = {
  color: 'green',
  icon: <IconCheck />,
};

export const error: NotificationsProps = { color: 'red', icon: <IconX /> };
