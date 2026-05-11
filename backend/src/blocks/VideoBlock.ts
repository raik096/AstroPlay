// src/blocks/VideoBlock.ts
import type { Block } from 'payload'

export const VideoBlock: Block = {
  slug: 'videoBlock', // Questo è il nome che useremo su Astro (blockType)
  interfaceName: 'VideoBlock',
  labels: {
    singular: 'Video',
    plural: 'Video',
  },
  fields: [
    {
      name: 'videoUrl',
      type: 'text',
      label: 'URL del Video (es. YouTube, Vimeo o MP4)',
      required: true,
      admin: {
        description: 'Inserisci il link completo del video.',
      }
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Didascalia (Opzionale)',
    }
  ],
}