import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonianze',
  title: 'Testimonianze',
  type: 'document',
  fields: [
    defineField({
      name: 'approved',
      title: 'Approvata',
      type: 'boolean',
      description: 'Solo le recensioni approvate compaiono sul sito.',
      initialValue: false,
    }),
    defineField({
      name: 'valutazione',
      title: 'Valutazione',
      type: 'number',
      options: {list: [1, 2, 3, 4, 5]},
      validation: (rule) => rule.required().integer().min(1).max(5),
    }),
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      description: 'Primo nome o nickname (opzionale).',
    }),
    defineField({
      name: 'message',
      title: 'Recensione',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required().max(500),
    }),
    defineField({
      name: 'date',
      title: 'Data',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [{title: 'Più recenti', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]}],
  preview: {
    select: {name: 'name', rating: 'valutazione', approved: 'approved', message: 'message'},
    prepare: ({name, rating, approved, message}) => ({
      title: `${'★'.repeat(rating ?? 0)} ${name || 'Anonimo'}`,
      subtitle: `${approved ? '✅ Approvata' : '⏳ Da approvare'} · ${message ?? ''}`,
    }),
  },
})
