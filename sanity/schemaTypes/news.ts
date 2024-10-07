export default {
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    {
      name: 'titolo',
      title: 'Titolo',
      type: 'string',
    },
    {
      name: 'img',
      title: 'Immagine',
      type: 'image',
      option: {
        hotspot: true,
        accept: 'image/*',
      },
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'titolo',
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input: string) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
    },
    {
      name: 'data',
      title: 'Data pubblicazione',
      type: 'date',
      options: {
        dateFormat: 'DD/MM/YYYY',
        calendarTodayLabel: 'Today',
      },
    },
    {
      name: 'descrizione',
      title: 'Descrizione',
      type: 'text',
      validation: (rule: any) => rule.max(300),
    },
    {
      name: 'contenuto',
      title: 'Contenuto',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
}
