import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Friends } from './collections/Friends'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Friends],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter ({
    client: {
      url: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})

/**
 * 
# installare e gestire sqlite3 , mi creo il database lo attacco al backend
# il backend poi espone api verso astro. Client high rendering, facendo un rebuild chiamando l'api
# attualmente l'idea è quella di creare il PoC che utilizza tre tecniche diverse insieme:
1. Basso rendering, statico che si aggiorna a tempo di build. 
2. High rendering, island client-side
3. High rendering, island server-side
 */