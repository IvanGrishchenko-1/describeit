import { User } from '@firebase/auth';
import { Paper, Stack, Tabs } from '@mantine/core';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { templateAtom } from '../../../atoms/templateAtom';
import {
  TemplateSelect,
  TemplateValues,
} from '../TemplateSelect/TemplateSelect';
import { TextTemplate } from './TextTemplate';
import { ThumbnaillTemplate } from './ThumbnailTemplate';

type CreatePostProps = {
  user?: User | null;
};

export const CreatePost: React.FC<CreatePostProps> = ({ user }) => {
  const template = useRecoilValue(templateAtom);

  const renderTemplate = (value: TemplateValues): JSX.Element => {
    switch (value) {
      case 'thumbnail_text':
        return <div>TT</div>;
      case 'text':
        return <TextTemplate user={user} />;
      case 'thumbnail':
        return <ThumbnaillTemplate user={user} />;
    }
  };

  return (
    <Tabs.Panel value="create-post">
      <Paper shadow="md" radius="md" p="md" withBorder>
        <Stack justify="flex-start" spacing="xl">
          <TemplateSelect />
          {renderTemplate(template as TemplateValues)}
        </Stack>
      </Paper>
    </Tabs.Panel>
  );
};
