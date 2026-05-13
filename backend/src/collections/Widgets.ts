import type { CollectionConfig } from 'payload'

export const Widgets: CollectionConfig = {
  slug: 'widgets',
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
      relationTo: 'media', // Colleghiamo il file JS caricato nei Media
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
      admin: {
        description: 'Configurazioni passate come attributi HTML',
      }
    },
  ],
}