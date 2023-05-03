import React from 'react';

import { TextCard } from '../../Card/TextCard';
import { ThumbnailCard } from '../../Card/ThumbnailCard';
import { ThumbnailTextCard } from '../../Card/ThumbnailTextCard';
import { DataType } from './TemplateSelect';

export const data: DataType[] = [
  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/describeit-fc0ca.appspot.com/o/templates%2Fthumbnail_text.jpg?alt=media&token=220b7459-e158-4757-95a7-c28d02e2a2ad',
    label: 'Thumbnail+text',
    value: 'thumbnail_text',
    title: 'profile:template_thumbnail_text',
    description: 'profile:template_thumbnail_text_description',
    popoverDropdown: (
      <ThumbnailTextCard
        image="https://i.imgur.com/Cij5vdL.png"
        link="/post/postId"
        title="Resident Evil Village review"
        description="Resident Evil Village is a direct sequel to 2017’s Resident Evil 7, but takes a very different direction to its predecessor, namely the fact that this time round instead of fighting against various mutated zombies, you’re now dealing with more occult enemies like werewolves and vampires."
        rating="Outstanding"
        author={{
          name: 'Bill Warmeater',
          image:
            'https://images.unsplash.com/photo-1593229874334-90d965f27c42?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=200&amp;q=80',
        }}
      />
    ),
  },

  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/describeit-fc0ca.appspot.com/o/templates%2Fthumbnail.jpg?alt=media&token=d3f30f16-ff28-4a9e-b110-ebdb766abdd1',
    label: 'Thumbnail',
    value: 'thumbnail',
    title: 'profile:template_thumbnail',
    description: 'profile:template_thumbnail_description',
    popoverDropdown: (
      <ThumbnailCard
        title="Best forests to visit in North America"
        image="https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
        category="nature"
      />
    ),
  },
  {
    image:
      'https://firebasestorage.googleapis.com/v0/b/describeit-fc0ca.appspot.com/o/templates%2Ftext.jpg?alt=media&token=34e5176f-a0f4-4d91-b4fe-38f91f85c645',
    label: 'Text',
    value: 'text',
    title: 'profile:template_text',
    description: 'profile:template_text_description',
    popoverDropdown: (
      <TextCard
        title="Theming documentation"
        description="Extend default theme with any amount of additional colors, replace shadows, radius, spacing, fonts and many other properties to match your design requirements. Mantine theme is just an object, you can subscribe to it in any part of application via context and use it to build your own components."
      />
    ),
  },
];
