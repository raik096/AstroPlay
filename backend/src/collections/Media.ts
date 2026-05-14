import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Contenuti',
  },
  upload: {
    staticDir: 'media',
    allowRestrictedFileTypes: true,
  },
  access: { 
      read: () => true,
      create: ({ req: { user } }) => !!user,
      update: ({ req: { user } }) => !!user,
      delete: ({ req: { user } }) => !!user,
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
  ],
}