import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  fields: [
    {
      name: 'slides',
      type: 'array', // Permette di aggiungere più slide
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'link', type: 'text' },
      ],
    },
  ],
}