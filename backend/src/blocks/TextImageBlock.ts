// src/blocks/TextImageBlock.ts
import type { Block } from 'payload'

export const TextImageBlock: Block = {
  slug: 'textImage',
  labels: {
    singular: 'Testo + Immagine',
    plural: 'Testo + Immagine',
  },
  fields: [
    {
      name: 'alignment',
      type: 'radio',
      options: [
        { label: 'Immagine a Sinistra', value: 'left' },
        { label: 'Immagine a Destra', value: 'right' },
      ],
      defaultValue: 'left',
    },
    {
      name: 'text',
      type: 'richText',
      required: true,
    },
    // Per brevità ometto il campo 'upload' dell'immagine, ma puoi immaginarlo qui
  ],
}