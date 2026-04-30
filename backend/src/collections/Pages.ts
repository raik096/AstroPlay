// src/collections/Pages.ts
import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title', // Mostra il titolo nella lista di Payload
  },
  access: {
    read: () => true, // Permette a chiunque (anche ad Astro) di leggere le pagine
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titolo Pagina',
    },
    {
      name: 'slug', // Fondamentale per creare URL come /chi-siamo o /servizi
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL della pagina (es: chi-siamo)',
      },
    },
    {
      name: 'content',
      type: 'richText', // Il redattore può scrivere, formattare, inserire link
      label: 'Contenuto Pagina',
      required: true,
    },
    {
      name: 'published',
      type: 'checkbox',
      label: 'Pubblicato',
      defaultValue: true,
    }
  ],
}