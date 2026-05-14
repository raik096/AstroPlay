import type { CollectionConfig } from 'payload'

export const Widgets: CollectionConfig = {
  slug: 'widgets',
  access: {
      read: () => true, 
      create: ({ req: { user } }) => !!user,
      update: ({ req: { user } }) => !!user,
      delete: ({ req: { user } }) => !!user,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Contenuti',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nome mnemonico (es: Sportelli URP)',
    },
    {
      name: 'tagName',
      type: 'text',
      required: true,
      label: 'Tag HTML del Custom Element (es: urp-toscana-widget)',
    },
    {
      name: 'jsFile',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'File JavaScript (Bundle)',
    },
    {
      name: 'cssFile',
      type: 'upload',
      relationTo: 'media',
      label: 'File CSS (opzionale)',
    },
    {
      name: 'initialProps',
      type: 'json',
      label: 'Proprietà iniziali (JSON)',
      // 👉 AGGIUNGI QUESTO:
      defaultValue: {}, 
      admin: {
        description: 'Configurazioni passate come attributi HTML',
      }
    },
  ],
}