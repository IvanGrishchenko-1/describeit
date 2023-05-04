import { Link } from '@mantine/tiptap';
import { Extensions } from '@tiptap/core';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import { Image } from '@tiptap/extension-image';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { Underline } from '@tiptap/extension-underline';
import { Youtube } from '@tiptap/extension-youtube';
import { StarterKit } from '@tiptap/starter-kit';
import { TFunction } from 'next-i18next';

export const editorExtensions = (t: TFunction, locale?: string): Extensions => [
  StarterKit,
  Underline,
  Link,
  Highlight,
  Color,
  TextStyle,
  Subscript,
  Superscript,
  Image.configure({ allowBase64: true }),
  Youtube.configure({ disableKBcontrols: true, interfaceLanguage: locale }),
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Placeholder.configure({ placeholder: t('common:content') as string }),
];
