import type { CollectionConfig } from 'payload'

export const Navigation: CollectionConfig = {
  slug: 'navigation',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'page', 'order'],
    group: 'Contenuti',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      label: 'Etichetta Menu',
    },
    {
      name: 'page',
      type: 'relationship',
      relationTo: 'pages',
      required: true,
      label: 'Pagina di destinazione',
    },
    {
      name: 'order',
      type: 'number',
      admin: { position: 'sidebar' },
      label: 'Ordine',
    },
  ],
}