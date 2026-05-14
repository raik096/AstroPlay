import type { CollectionConfig } from 'payload'

export const Friends: CollectionConfig = {
  slug: 'friends',
  admin: {
    group: 'Dati Esterni',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    { name: 'firstName', type: 'text' },
    { name: 'lastName', type: 'text' },
    { name: 'email', type: 'text' },
    { name: 'age', type: 'number' },
  ],

  // L'endpoint per popolare il DB (Seeding)
  endpoints: [
    {
      path: '/seed',
      method: 'get',
      handler: async (req) => {
        if (!req.user) {
          return Response.json({ error: 'Non autorizzato' }, { status: 401 });
        }

        try {
          const response = await fetch('https://dummyjson.com/users?limit=5');
          const data = await response.json();
          
          let count = 0;

          for (const utente of data.users) {
            await req.payload.create({
              collection: 'friends',
              data: {
                firstName: utente.firstName,
                lastName: utente.lastName,
                email: utente.email,
                age: utente.age,
              },
            });
            count++;
          }

          return Response.json({ message: `Iniezione completata: ${count} amici aggiunti al DB!` });
          
        } catch (error) {
          console.error('Errore nel seeding:', error);
          return Response.json({ error: 'Errore durante l\'importazione dei dati' }, { status: 500 });
        }
      },
    },
  ],
}