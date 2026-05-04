// src/collections/News.ts
import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  
  endpoints: [
    {
      path: '/seed',
      method: 'get',
      handler: async (req) => {
        try {
          const response = await fetch('https://dummyjson.com/posts?limit=10');
          const data = await response.json();

          let insertedCount = 0;

          for (const post of data.posts) {
            await req.payload.create({
              collection: 'news',
              data: {
                title: post.title,
                excerpt: post.body.substring(0, 100) + '...',
                category: 'tech',
              },
              overrideAccess: true, 
            });
            insertedCount++;
          }

          return Response.json(
            { status: 'success', message: `${insertedCount} articoli importati con successo.` },
            { status: 200 }
          );

        } catch (error: any) {
          return Response.json(
            { status: 'error', message: error.message },
            { status: 500 }
          );
        }
      },
    },
  ],
  fields: [
    {
        name: 'title',
        type: 'text',
        required: true,
        label: 'Titolo Articolo',
    },
    {
        name: 'excerpt',
        type: 'textarea',
        label: 'Riassunto (Excerpt)',
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar', 
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Contenuto dell\'Articolo',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Tecnologia', value: 'tech' },
        { label: 'Eventi', value: 'events' },
        { label: 'Azienda', value: 'company' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
      },
    }
  ],
}