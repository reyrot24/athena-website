import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'galleria',
  title: 'Galleria',
  type: 'document',
  fields: [
    defineField({
      name: 'nomeImg',
      title: 'Didascalia',
      type: 'string',
      description: 'Breve descrizione della foto (usata anche per l\'accessibilità). Le foto sono ordinate per didascalia.',
    }),
    defineField({
      name: 'image',
      title: 'Foto',
      type: 'image',
      options: {hotspot: true, accept: 'image/*'},
      description: 'Le foto orizzontali vengono usate anche nella hero della home.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'nomeImg', media: 'image'},
  },
})
