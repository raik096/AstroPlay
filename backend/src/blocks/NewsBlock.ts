// src/blocks/NewsBlock.ts
import type { Block } from 'payload'

export const NewsBlock: Block = {
  slug: 'newsBlock', // blockType per Astro
  interfaceName: 'NewsBlock',
  labels: {
    singular: 'Sezione Ultime News',
    plural: 'Sezioni Ultime News',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titolo della Sezione',
      defaultValue: 'Ultime notizie',
      required: true,
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Numero di notizie da mostrare',
      defaultValue: 3,
      min: 1,
      max: 12,
      admin: {
        description: 'Quante notizie vuoi far apparire in questa sezione?',
      }
    }
  ],
}