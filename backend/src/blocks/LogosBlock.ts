// src/blocks/LogosBlock.ts
import type { Block } from 'payload'

export const LogosBlock: Block = {
  slug: 'logosBlock',
  interfaceName: 'LogosBlock',
  labels: {
    singular: 'Riga Loghi',
    plural: 'Righe Loghi',
  },
  fields: [
    {
      name: 'logos',
      type: 'array',
      label: 'Elenco Loghi',
      minRows: 1,
      labels: {
        singular: 'Logo',
        plural: 'Loghi',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media', // Assicurati di aver creato la collection Media!
          required: true,
          label: 'Immagine del Logo'
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link di destinazione (es. https://www.regione.toscana.it)',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Titolo accessibile (es. Vai a Regione Toscana)',
          required: true,
        }
      ],
    },
  ],
}