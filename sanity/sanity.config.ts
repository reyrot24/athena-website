import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'SSD CAM Athena',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'b0b0ndzw',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenuti')
          .items([
            S.documentTypeListItem('news').title('News'),
            S.documentTypeListItem('corsi').title('Orari corsi'),
            S.documentTypeListItem('corsiImg').title('Locandine corsi'),
            S.documentTypeListItem('galleria').title('Galleria'),
            S.documentTypeListItem('chisiamo').title('Trainer'),
            S.documentTypeListItem('lanostrastoria').title('La nostra storia'),
            S.divider(),
            S.listItem()
              .title('Recensioni da approvare')
              .child(
                S.documentList()
                  .title('Da approvare')
                  .apiVersion('2025-09-01')
                  .filter('_type == "testimonianze" && approved != true')
                  .defaultOrdering([{field: '_createdAt', direction: 'desc'}]),
              ),
            S.documentTypeListItem('testimonianze').title('Tutte le recensioni'),
            S.divider(),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
