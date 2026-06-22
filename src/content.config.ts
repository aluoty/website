import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const collections = {
  articles: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      date: z.date().transform((d) => d.toISOString().split('T')[0]),
      tags: z.array(z.string()).default([]),
    }),
  }),
};
