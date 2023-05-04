import { User } from '@firebase/auth';
import { addDoc, collection, doc } from '@firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import {
  Button,
  Divider,
  FileInput,
  Group,
  Image,
  Input,
  Loader,
  Radio,
  rem,
  Stack,
  useMantineTheme,
} from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconUpload } from '@tabler/icons-react';
import { useEditor } from '@tiptap/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import { firestore, storage } from '../../../firebase/ClientApp';
import { editorExtensions } from '../../../util/EditorExtensions';
import { TextEditorDropzone } from '../../Dropzone/TextEditorDropzone';
import { ThumbnailTemplateModal } from '../../Modal/Templates/ThumbnailTemplateModal';
import { error, success } from '../../Notifications/Notifications';
import { TextEditor } from '../../TextEditor/TextEditor';
import { radios } from './TextTemplate';

type ThumbnailTemplateProps = {
  user?: User | null;
};

export const ThumbnaillTemplate: React.FC<ThumbnailTemplateProps> = ({
  user,
}) => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const form = useForm({
    initialValues: { image: '', title: '', category: '', type: 'none' },
    validate: {
      title: val => (val.length === 0 ? t('profile:title_error') : null),
      category: val => (val.length === 0 ? t('profile:category_error') : null),
      image: val => (val.length === 0 ? t('profile:image_error') : null),
    },
  });
  const editor = useEditor({
    extensions: editorExtensions(t, locale),
    editable: true,
  });
  const [opened, { open, close }] = useDisclosure();
  const theme = useMantineTheme();
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [value, setValue] = useState<FileWithPath | null>(null);

  const handleFileDrop = async (files: FileWithPath[]): Promise<void> => {
    setFileLoading(true);
    const file = files[0];
    const imageRef = ref(storage, `posts/${user?.uid}/${file.name}`);
    await uploadBytes(imageRef, file);
    const downloadUrl = await getDownloadURL(imageRef);
    if (downloadUrl) {
      notifications.show({
        title: t('notifications:success_image_upload_title'),
        message: t('notifications:success_image_upload_message'),
        ...success,
      });
      setImageUrl(downloadUrl);
      form.setFieldValue('image', downloadUrl);
    } else
      notifications.show({
        title: t('notifications:oops'),
        message: t('notifications:something_went_wrong'),
        ...error,
      });
    setFileLoading(false);
  };

  const handleOnSubmit = async (): Promise<void> => {
    setLoading(true);
    const collectionRef = collection(firestore, 'posts');
    const userDocRef = doc(firestore, 'users', `${user?.uid}`);
    const post = {
      template: 'thumbnail',
      post_type: form.values.type,
      image: form.values.image,
      title: form.values.title,
      category: form.values.category,
      content: editor?.getJSON(),
      user: userDocRef,
    };
    const addedPost = await addDoc(collectionRef, post);
    addedPost.id
      ? notifications.show({
          title: t('notifications:success_post_create_title'),
          message: t('notifications:success_post_create_message'),
          ...success,
        })
      : notifications.show({
          title: t('notifications:error_post_create_title'),
          message: t('notifications:error_post_create_message'),
          ...error,
        });
    setLoading(false);
  };

  return (
    <form onSubmit={form.onSubmit(handleOnSubmit)}>
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

        <Input.Wrapper
          id="category-input"
          withAsterisk
          label={t('profile:category')}
          error={form.errors.category}
        >
          <Input
            id="category-input"
            placeholder={t('profile:category')}
            value={form.values.category}
            onChange={event =>
              form.setFieldValue('category', event.currentTarget.value)
            }
          />
        </Input.Wrapper>

        <Input.Wrapper
          id="image-input"
          withAsterisk
          label={t('profile:image')}
          error={form.errors.image}
        >
          {imageUrl ? (
            <Group spacing="xl">
              {fileLoading ? (
                <Loader
                  color={theme.colorScheme === 'dark' ? 'orange' : 'indigo'}
                />
              ) : (
                <Image
                  src={imageUrl}
                  alt="thumbnail"
                  width={320}
                  height={380}
                />
              )}
              <FileInput
                w={300}
                label={t('profile:choose_different_photo')}
                placeholder={t('profile:select_file') as string}
                variant="filled"
                icon={<IconUpload size={rem(14)} />}
                accept="image/png,image/jpeg"
                value={value}
                onChange={payload =>
                  payload ? handleFileDrop([payload]) : setValue(payload)
                }
              />
            </Group>
          ) : (
            <TextEditorDropzone
              handleOnDrop={handleFileDrop}
              loading={fileLoading}
            />
          )}
        </Input.Wrapper>

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

        <TextEditor editor={editor} />

        <Divider />

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
            loading={loading}
          >
            {t('profile:create_post')}
          </Button>
          <Button
            component={motion.button}
            variant="outline"
            color={theme.colorScheme === 'dark' ? 'orange' : 'indigo'}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={open}
          >
            {t('profile:preview_post')}
          </Button>
        </Group>
      </Stack>

      <ThumbnailTemplateModal
        opened={opened}
        close={close}
        image={form.values.image}
        title={form.values.title}
        category={form.values.category}
      />
    </form>
  );
};
