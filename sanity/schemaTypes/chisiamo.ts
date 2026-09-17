import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'chisiamo',
  title: 'Trainer',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lavoro',
      title: 'Ruolo',
      type: 'string',
      description: 'Es. Personal Trainer, Chinesiologo, Istruttrice.',
    }),
    defineField({
      name: 'foto',
      title: 'Foto',
      type: 'image',
      options: {hotspot: true},
      description: 'Formato quadrato consigliato (1080×1080).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'descrizione',
      title: 'Descrizione',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Si apre cliccando sul trainer nella pagina «Chi siamo».',
    }),
    defineField({
      name: 'id',
      title: 'Ordine',
      type: 'number',
      description: 'Posizione nella griglia: i numeri più bassi compaiono prima.',
    }),
  ],
  orderings: [{title: 'Ordine', name: 'ordine', by: [{field: 'id', direction: 'asc'}]}],
  preview: {
    select: {title: 'nome', subtitle: 'lavoro', media: 'foto'},
  },
})
