import { Paper, Stack, Tabs } from '@mantine/core';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { templateAtom } from '../../../atoms/templateAtom';
import {
  TemplateSelect,
  TemplateValues,
} from '../TemplateSelect/TemplateSelect';
import { TextTemplate } from './TextTemplate';

export const CreatePost: React.FC = () => {
  const template = useRecoilValue(templateAtom);

  const renderTemplate = (value: TemplateValues): JSX.Element => {
    switch (value) {
      case 'thumbnail_text':
        return <div>TT</div>;
      case 'text':
        return <TextTemplate />;
      case 'thumbnail':
        return <div>Thumbnail</div>;
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
