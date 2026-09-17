import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    defineField({
      name: 'titolo',
      title: 'Titolo',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (indirizzo della pagina)',
      type: 'slug',
      options: {
        source: 'titolo',
        maxLength: 200,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .slice(0, 60),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'data',
      title: 'Data pubblicazione',
      type: 'date',
      options: {dateFormat: 'DD-MM-YYYY'},
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'img',
      title: 'Immagine / locandina',
      type: 'image',
      options: {hotspot: true, accept: 'image/*'},
      description: 'Usata come copertina e come anteprima quando la news viene condivisa.',
    }),
    defineField({
      name: 'descrizione',
      title: 'Descrizione breve',
      type: 'text',
      rows: 3,
      description: 'Compare nelle anteprime e sotto il titolo.',
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'contenuto',
      title: 'Contenuto',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'alt', title: 'Testo alternativo', type: 'string'}],
        },
      ],
    }),
    defineField({
      name: 'video',
      title: 'Questo post contiene un video?',
      type: 'boolean',
      description: "Se sì, attiva il toggle e incolla qui sotto il link ottenuto dalla pagina /upload del sito.",
    }),
    defineField({
      name: 'link',
      title: 'Link video',
      type: 'url',
      hidden: ({document}) => !document?.video,
    }),
    defineField({
      name: 'pdf',
      title: 'PDF allegato',
      type: 'file',
      options: {accept: 'application/pdf'},
    }),
  ],
  orderings: [{title: 'Più recenti', name: 'dataDesc', by: [{field: 'data', direction: 'desc'}]}],
  preview: {
    select: {title: 'titolo', subtitle: 'data', media: 'img'},
  },
})
