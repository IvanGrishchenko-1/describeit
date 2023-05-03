import { Button, Group, Input, Modal, useMantineTheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import { motion } from 'framer-motion';
import React, { FormEvent } from 'react';

import { TextEditorModalProps } from './ImageModal';

export const YoutubeModal: React.FC<TextEditorModalProps> = ({
  opened,
  close,
  editor,
}) => {
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: { url: '' },
    validate: {
      url: val =>
        /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\\-]+\?v=|embed\/|v\/)?)([\w\\-]+)(\S+)?$/.test(
          val,
        )
          ? null
          : 'Invalid URL',
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.stopPropagation();
    editor?.commands.setYoutubeVideo({ src: form.values.url });
    close();
  };

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
      <form onSubmit={form.onSubmit((values, event) => handleSubmit(event))}>
        <Group>
          <Input.Wrapper
            id="url-input"
            withAsterisk
            label="Credit card information"
            description="Please enter your credit card information, we need some money"
            error={form.errors.url}
          >
            <Input
              id="url-input"
              placeholder="Enter youtube video URL"
              value={form.values.url}
              onChange={event =>
                form.setFieldValue('url', event.currentTarget.value)
              }
            />
          </Input.Wrapper>
          <Button
            component={motion.button}
            mt="auto"
            type="submit"
            variant="gradient"
            gradient={
              theme.colorScheme === 'dark'
                ? { from: 'orange', to: 'red', deg: 45 }
                : { from: 'indigo', to: 'cyan', deg: 45 }
            }
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Submit
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
