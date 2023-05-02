import { Select } from '@mantine/core';
import { IconHash } from '@tabler/icons-react';
import { useTranslation } from 'next-i18next';
import React, { ReactNode } from 'react';
import { useRecoilState } from 'recoil';

import { templateAtom } from '../../../atoms/templateAtom';
import { SelectItem } from './SelectItem/SelectItem';
import { data } from './TemplateSelect.mock';

export type TemplateValues = 'thumbnail_text' | 'thumbnail' | 'text';

export type DataType = {
  image: string;
  label: string;
  value: TemplateValues;
  description: string;
  popoverDropdown: ReactNode;
};

export const TemplateSelect: React.FC = () => {
  const { t } = useTranslation();
  const [template, setTemplate] = useRecoilState(templateAtom);

  return (
    <Select
      w="100%"
      label={t('profile:select_template')}
      placeholder={t('profile:pick_one') as string}
      itemComponent={SelectItem}
      value={template}
      onChange={setTemplate}
      data={data}
      searchable
      maxDropdownHeight={400}
      nothingFound={t('profile:nothing_found')}
      filter={(value, item) =>
        item.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
        item.description.toLowerCase().includes(value.toLowerCase().trim())
      }
      transitionProps={{
        transition: 'pop-top-left',
        duration: 80,
        timingFunction: 'ease',
      }}
      icon={<IconHash size="1rem" />}
      dropdownComponent="div"
    />
  );
};
