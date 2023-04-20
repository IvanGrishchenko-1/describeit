import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import {
  Avatar,
  Button,
  FileInput,
  Flex,
  rem,
  Stack,
  useMantineTheme,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconUpload } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { useUpdateProfile } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';

import { profileImageAtom } from '../../atoms/profileImageAtom';
import { auth, storage } from '../../firebase/ClientApp';
import { error, success } from '../Notifications/Notifications';

export type AvatarUploaderProps = {
  photoUrl?: string | null;
  userUid?: string;
  matchesMiddle: boolean;
};

export const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  photoUrl,
  userUid,
  matchesMiddle,
}) => {
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const [files, setFiles] = useRecoilState(profileImageAtom);
  const [loading, setLoading] = useState(false);
  const [updateProfile] = useUpdateProfile(auth);
  const { push, pathname, query, asPath, locale } = useRouter();

  const handleUpload = async (): Promise<void> => {
    setLoading(true);
    const imageRef = ref(storage, `avatar/${userUid}/${files[0].name}`);
    Promise.resolve(uploadBytes(imageRef, files[0]))
      .then(() => getDownloadURL(imageRef))
      .then(downloadUrl => updateProfile({ photoURL: downloadUrl }))
      .then(() => push({ pathname, query }, asPath, { locale, shallow: true }))
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
    <Stack
      spacing={matchesMiddle ? '1.8rem' : '1rem'}
      sx={{ flexDirection: matchesMiddle ? 'row' : 'column' }}
    >
      <Avatar
        src={files.length ? URL.createObjectURL(files[0]) : photoUrl}
        alt="avatar"
        size="xl"
        sx={{ alignSelf: 'center' }}
      />
      <Flex
        direction={matchesMiddle ? 'column' : 'row'}
        justify="center"
        gap="xl"
        w="100%"
      >
        <Button
          component={motion.button}
          variant="gradient"
          gradient={
            theme.colorScheme === 'dark'
              ? { from: 'orange', to: 'red', deg: 45 }
              : { from: 'indigo', to: 'cyan', deg: 45 }
          }
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleUpload}
          loading={loading}
          disabled={!files.length}
          w={200}
        >
          {t('profile:upload')}
        </Button>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <FileInput
            multiple={false}
            accept="image/png,image/jpeg"
            placeholder={t('profile:choose_different_photo') as string}
            icon={
              <IconUpload
                color={
                  theme.colorScheme === 'dark'
                    ? theme.colors.orange[8]
                    : theme.colors.indigo[8]
                }
                size={rem(16)}
              />
            }
            w={200}
            onChange={file => file && setFiles([file])}
          />
        </motion.div>
      </Flex>
    </Stack>
  );
};
