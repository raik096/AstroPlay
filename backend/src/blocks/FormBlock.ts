import type { Block } from 'payload'

export const FormBlock: Block = {
  slug: 'formBlock',
  labels: {
    singular: 'Modulo di Contatto / Form',
    plural: 'Moduli di Contatto',
  },
  fields: [
    {
      name: 'formTitle',
      type: 'text',
      label: 'Titolo del Form',
      required: true,
    },
    {
      name: 'formType',
      type: 'select',
      label: 'Tipo di Modulo',
      options: [
        { label: 'Richiesta Informazioni URP', value: 'info' },
        { label: 'Segnalazione Disservizio', value: 'report' },
        { label: 'Prenotazione Appuntamento', value: 'booking' },
      ],
    },
    {
      name: 'showPrivacyCheckbox',
      type: 'checkbox',
      label: 'Mostra informativa privacy obbligatoria',
      defaultValue: true,
    }
  ],
}