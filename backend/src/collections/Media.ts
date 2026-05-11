import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true, // Abilita il caricamento dei file
  access: { read: () => true },
  fields: [
    { name: 'alt', type: 'text', required: true },
  ],
}