import {defineCollection, z} from 'astro:content';

const articles = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    image: z.string().optional(),
  }),
});

export const collections = {articles};
