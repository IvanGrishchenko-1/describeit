import {
  Button,
  Group,
  Input,
  Radio,
  Stack,
  Textarea,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { TextEditor } from '../../TextEditor/TextEditor';

const radios = ['none', 'anime', 'games', 'movies', 'music'];

export const TextTemplate: React.FC = () => {
  const { t } = useTranslation();
  const form = useForm({
    initialValues: { title: '', description: '', type: 'none' },
    validate: {
      title: val => (val.length === 0 ? t('profile:title_error') : null),
      description: val =>
        val.length === 0 ? t('profile:description_error') : null,
    },
  });
  const theme = useMantineTheme();
  const handleSubmit = async (): Promise<void> => {
    console.log('Submit');
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack justify="flex-start" spacing="xl">
        <Input.Wrapper
          id="title-input"
          withAsterisk
          label={t('profile:title')}
          error={form.errors.title}
        >
          <Input
            id="title-input"
            placeholder={t('profile:title')}
            value={form.values.title}
            onChange={event =>
              form.setFieldValue('title', event.currentTarget.value)
            }
          />
        </Input.Wrapper>

        <Textarea
          placeholder={t('profile:description') as string}
          label={t('profile:description')}
          description={t('profile:description_description')}
          withAsterisk
          value={form.values.description}
          onChange={event =>
            form.setFieldValue('description', event.currentTarget.value)
          }
          error={form.errors.description}
        />

        <Radio.Group
          value={form.values.type}
          onChange={value => form.setFieldValue('type', value)}
          name="postType"
          label={t('profile:post_type_label')}
          description={t('profile:post_type_description')}
          withAsterisk
        >
          <Group mt="xs">
            {radios.map((value, index) => (
              <Radio
                key={`radio-${index}`}
                value={value}
                label={t(`tabs:${value}`)}
                color={theme.colorScheme === 'dark' ? 'orange' : 'indigo'}
              />
            ))}
          </Group>
        </Radio.Group>

        <TextEditor editable={true} />

        <Group>
          <Button
            component={motion.button}
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
            {t('profile:create_post')}
          </Button>
          <Button
            component={motion.button}
            variant="outline"
            color={theme.colorScheme === 'dark' ? 'orange' : 'indigo'}
          >
            {t('profile:preview_post')}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
