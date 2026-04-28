import type { CollectionConfig } from 'payload'

export const Friends: CollectionConfig = {
  slug: 'friends',
  access: {
    // Chiunque può leggere la lista degli amici
    read: () => true,
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
      // Usiamo un path statico e semplice
      path: '/seed',
      method: 'get',
      handler: async (req) => {
        try {
          // 1. Chiamiamo DummyJSON (prendiamo 5 utenti)
          const response = await fetch('https://dummyjson.com/users?limit=5');
          const data = await response.json();
          
          let count = 0;

          // 2. Cicliamo e usiamo la Local API per salvare i dati
          for (const utente of data.users) {
            await req.payload.create({
              collection: 'friends' as any, // Deve coincidere con lo slug!
              data: {
                firstName: utente.firstName,
                lastName: utente.lastName,
                email: utente.email,
                age: utente.age,
              },
            });
            count++;
          }

          // 3. Risposta di successo
          return Response.json({ message: `Iniezione completata: ${count} amici aggiunti al DB!` });
          
        } catch (error) {
          console.error('Errore nel seeding:', error);
          return Response.json({ error: 'Errore durante l\'importazione dei dati' }, { status: 500 });
        }
      },
    },
  ],
}