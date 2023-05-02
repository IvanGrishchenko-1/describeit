import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { Modal, useMantineTheme } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';
import { Editor } from '@tiptap/react';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, storage } from '../../../firebase/ClientApp';
import { TextEditorDropzone } from '../../Dropzone/TextEditorDropzone';
import { error, success } from '../../Notifications/Notifications';

export type TextEditorModalProps = {
  opened: boolean;
  close: () => void;
  editor: Editor | null;
};

export const ImageModal: React.FC<TextEditorModalProps> = ({
  opened,
  close,
  editor,
}) => {
  const theme = useMantineTheme();
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const { t } = useTranslation();

  const handleUpload = async (files: FileWithPath[]): Promise<void> => {
    setLoading(true);
    const imageRef = ref(storage, `posts/${user?.uid}/${files[0].name}`);
    Promise.resolve(uploadBytes(imageRef, files[0]))
      .then(() => getDownloadURL(imageRef))
      .then(downloadUrl => {
        editor?.chain().focus().setImage({ src: downloadUrl }).run();
        return close();
      })
      .then(() =>
        notifications.show({
          title: t('notifications:success_image_upload_title'),
          message: t('notifications:success_image_upload_message'),
          ...success,
        }),
      )
      .catch(() =>
        notifications.show({
          title: t('notifications:oops'),
          message: t('notifications:something_went_wrong'),
          ...error,
        }),
      )
      .finally(() => setLoading(false));
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
      <TextEditorDropzone handleOnDrop={handleUpload} loading={loading} />
    </Modal>
  );
};
