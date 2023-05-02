import { Input, Stack, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { TextEditor } from '../../TextEditor/TextEditor';

export const TextTemplate: React.FC = () => {
  const { t } = useTranslation();
  const form = useForm({
    initialValues: { title: '', description: '', icon: '' },
    validate: {
      title: val => (val.length === 0 ? t('profile:title_error') : null),
      description: val =>
        val.length === 0 ? t('profile:description_error') : null,
    },
  });

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
        <TextEditor editable={true} />
      </Stack>
    </form>
  );
};
