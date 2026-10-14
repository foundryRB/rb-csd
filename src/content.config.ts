import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const validTypes = ['Overview', 'Standard', 'Guide', 'Template', 'Reference', 'Intent'] as const;
const validStatuses = ['Draft', 'Active', 'Deprecated'] as const;

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        id: z.string(),
        type: z.enum(validTypes),
        status: z.enum(validStatuses),
        version: z.string(),
        updated: z.string(),
        owner: z.string().optional(),
      }),
    }),
  }),
};
