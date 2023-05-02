import { createStyles, Paper, rem, Text, ThemeIcon } from '@mantine/core';
import { IconColorSwatch } from '@tabler/icons-react';
import React from 'react';

const useStyles = createStyles(theme => ({
  card: {
    width: rem(320),
    height: rem(380),
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
    transition: 'transform 150ms ease, box-shadow 100ms ease',
    padding: theme.spacing.xl,
    paddingLeft: `calc(${theme.spacing.xl} * 2)`,

    '&:hover': {
      boxShadow: theme.shadows.md,
      transform: 'scale(1.02)',
    },

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: rem(6),
      backgroundImage: theme.fn.linearGradient(
        0,
        theme.colors.pink[6],
        theme.colors.orange[6],
      ),
    },
  },
}));

interface CardGradientProps {
  title: string;
  description: string;
}

export const TextCard: React.FC<CardGradientProps> = ({
  title,
  description,
}) => {
  const { classes } = useStyles();
  return (
    <Paper withBorder radius="md" className={classes.card}>
      <ThemeIcon
        size="xl"
        radius="md"
        variant="gradient"
        gradient={{ deg: 0, from: 'pink', to: 'orange' }}
      >
        <IconColorSwatch size={rem(28)} stroke={1.5} />
      </ThemeIcon>
      <Text size="xl" weight={500} mt="md">
        {title}
      </Text>
      <Text size="sm" mt="sm" color="dimmed">
        {description}
      </Text>
    </Paper>
  );
};
