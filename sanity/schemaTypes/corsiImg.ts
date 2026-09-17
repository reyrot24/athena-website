import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'corsiImg',
  title: 'Locandine corsi',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome del corso',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Locandina',
      type: 'image',
      options: {hotspot: true, accept: 'image/*'},
      description: 'La locandina viene mostrata intera nella pagina «Corsi».',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'nome', media: 'image'},
  },
})
