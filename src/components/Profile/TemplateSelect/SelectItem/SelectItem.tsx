import { Avatar, Center, Group, Popover, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'next-i18next';
import React, { forwardRef, ReactNode } from 'react';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
  title: string;
  description: string;
  popoverDropdown: ReactNode;
}

interface CustomTargetProps extends Omit<ItemProps, 'popoverDropdown'> {
  open: () => void;
  close: () => void;
}

const CustomTarget = forwardRef<HTMLDivElement, CustomTargetProps>(
  ({ image, title, description, open, close }, ref, ...props) => {
    const { t } = useTranslation();

    return (
      <div ref={ref} {...props}>
        <Group noWrap onMouseEnter={open} onMouseLeave={close}>
          <Avatar src={image} />

          <div>
            <Text size="sm">{t(title)}</Text>
            <Text size="xs" opacity={0.65}>
              {t(description)}
            </Text>
          </div>
        </Group>
      </div>
    );
  },
);

CustomTarget.displayName = 'CustomTarget';

export const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  (
    { image, label, title, description, popoverDropdown, ...others }: ItemProps,
    ref,
  ) => {
    const [opened, { open, close }] = useDisclosure();

    return (
      <div ref={ref} {...others}>
        <Popover
          position="bottom-start"
          shadow="md"
          opened={opened}
          transitionProps={{ transition: 'scale-x', duration: 500 }}
        >
          <Popover.Target>
            <CustomTarget
              image={image}
              label={label}
              title={title}
              description={description}
              open={open}
              close={close}
            />
          </Popover.Target>
          <Popover.Dropdown>
            <Center maw={320} mah={380}>
              {popoverDropdown}
            </Center>
          </Popover.Dropdown>
        </Popover>
      </div>
    );
  },
);

SelectItem.displayName = 'Select-item';
