// src/blocks/ServiziSectionBlock.ts
import type { Block } from 'payload'

export const ServiziSectionBlock: Block = {
  slug: 'serviziSection', // Assicurati che corrisponda nel tuo switch [slug].astro
  labels: {
    singular: 'Sezione Servizi',
    plural: 'Sezioni Servizi',
  },
  fields: [
    {
      name: 'titoloSezione',
      type: 'text',
      label: 'Titolo della Sezione',
      defaultValue: 'Servizi in Evidenza',
    },
    {
      name: 'listaServizi', // <-- QUESTO È L'ARRAY CHE GIRA NEL `.map()` DI ASTRO
      type: 'array',
      label: 'Elenco dei Servizi',
      minRows: 1,
      fields: [
        {
          name: 'nomeServizio',
          type: 'text',
          required: true,
          label: 'Nome (es. Cambio medico)',
        },
        {
          name: 'descrizioneBreve',
          type: 'textarea',
          label: 'Breve Descrizione',
        },
        {
          name: 'linkURL',
          type: 'text',
          label: 'Link di destinazione',
        },
        {
          name: 'classeIcona',
          type: 'text',
          label: 'Classe CSS Icona (es. rt-icon-salute, rt-icon-lavoro)',
        },
        {
          name: 'tagUtente',
          type: 'text',
          label: 'Target (es. Cittadino, Impresa)',
        }
      ],
    },
  ],
}