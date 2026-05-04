// src/collections/Pages.ts
import type { CollectionConfig } from 'payload'

import { HeroBlock } from '../blocks/HeroBlock'
import { TextImageBlock } from '../blocks/TextImageBlock'
import { FormBlock } from '../blocks/FormBlock'


const triggerVercelBuild = async () => {
  const webhookURL = 'https://api.vercel.com/v1/integrations/deploy/prj_xyz123'; 

  try {
    console.log('📡 Lancio il webhook per ricostruire le pagine statiche di Astro...');
    const response = await fetch(webhookURL, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    
    if (response.ok) {
        console.log('✅ Webhook inviato con successo! La build è partita.');
    } else {
        console.error('❌ Errore Vercel:', response.statusText);
    }
  } catch (error) {
    console.error('❌ Rete irraggiungibile. Webhook fallito:', error);
  }
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },

  access: {
    read: () => true, 
  },
  
  hooks: {
    afterChange: [
      // ▼ ABBIAMO TRASFORMATO LA FUNZIONE IN "async" E AGGIUNTO "req" ▼
      async ({ doc, operation, req }) => {
        
        // 1. Lancia il webhook di Vercel ad ogni salvataggio (creazione o modifica)
        if (operation === 'create' || operation === 'update') {
          triggerVercelBuild();
        }

        // 2. NUOVO AUTOMATISMO: Inserisce la pagina nel Menu SOLO quando viene creata
        if (operation === 'create') {
          try {
            await req.payload.create({
              collection: 'navigation', // Assicurati di aver creato Navigation.ts!
              data: {
                label: doc.title,
                page: doc.id,
                order: 10,
              },
            });
            console.log(`✅ Pagina "${doc.title}" aggiunta automaticamente al menu.`);
          } catch (err) {
            console.error("❌ Errore durante l'inserimento automatico nel menu:", err);
          }
        }
        
        return doc;
      }
    ],
    afterDelete: [
      () => {
        triggerVercelBuild();
      }
    ]
  },

  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    
    {
      name: 'layout', 
      type: 'blocks',
      label: 'Costruttore Pagina (Page Builder)',
      minRows: 1, 
      blocks: [
        HeroBlock,
        TextImageBlock,
        FormBlock
      ],
    },
  ],
}