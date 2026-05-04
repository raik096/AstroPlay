// src/blocks/HeroBlock.ts
import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero', // L'ID univoco di questo blocco
  labels: {
    singular: 'Blocco Hero',
    plural: 'Blocchi Hero',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Titolo Principale',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Sottotitolo',
    },
    // Potresti aggiungere anche un campo 'image' per lo sfondo!
  ],
}