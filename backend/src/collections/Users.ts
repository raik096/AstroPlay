import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'Amministrazione',
  },
  auth: true,
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => true, // Permettiamo la creazione iniziale o registrazione
    update: ({ req: { user } }) => {
      if (user) return { id: { equals: user.id } }
      return false
    },
    delete: ({ req: { user } }) => {
      if (user) return { id: { equals: user.id } }
      return false
    },
  },
  fields: [
    // Aggiungi qui campi personalizzati come 'role', 'name', ecc.
  ],
}
