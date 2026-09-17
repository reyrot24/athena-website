import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'lanostrastoria',
  title: 'La nostra storia',
  type: 'document',
  description: 'Le tappe della timeline in «Chi siamo». Finché non ne crei una, il sito mostra le tappe predefinite.',
  fields: [
    defineField({
      name: 'titolo',
      title: 'Titolo',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'data',
      title: 'Data',
      type: 'date',
      options: {dateFormat: 'DD/MM/YYYY'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'descrizione',
      title: 'Descrizione',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(300),
    }),
  ],
  orderings: [{title: 'Data', name: 'data', by: [{field: 'data', direction: 'asc'}]}],
  preview: {
    select: {title: 'titolo', subtitle: 'data'},
  },
})
