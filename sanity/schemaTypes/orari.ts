import {defineField, defineType} from 'sanity'

const days = [
  ['lunedi', 'Lunedì'],
  ['martedi', 'Martedì'],
  ['mercoledi', 'Mercoledì'],
  ['giovedi', 'Giovedì'],
  ['venerdi', 'Venerdì'],
  ['sabato', 'Sabato'],
  ['domenica', 'Domenica'],
] as const

export default defineType({
  name: 'corsi',
  title: 'Orari corsi',
  type: 'document',
  description:
    'Un orario per riga, nel formato «17:30-18:30». Puoi aggiungere un\'etichetta prima: «Bambini: 17:30-18:30».',
  fields: [
    defineField({
      name: 'corso',
      title: 'Corso',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    ...days.map(([name, title]) =>
      defineField({
        name,
        title,
        type: 'array',
        of: [{type: 'string', title: 'Orario'}],
      }),
    ),
  ],
  preview: {
    select: {title: 'corso'},
  },
})
