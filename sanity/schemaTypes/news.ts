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
      name: 'video',
      title: 'Questo post contiene un video?',
      type: 'boolean',
      description: "Se si, attivare il toggle e inserire il link dall'upload",
    },
    {
      name: 'link',
      title: 'Link video',
      type: 'string',
    },
    {
      name: 'pdf',
      title: 'PDF',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'titolo',
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input: string) =>
          input.toLowerCase().replace(/\s+/g, '-').replace(/\,/g, '').slice(0, 50),
      },
    },
    {
      name: 'data',
      title: 'Data pubblicazione',
      type: 'date',
      options: {
        dateFormat: 'DD-MM-YYYY',
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
      of: [
        {type: 'block'},
        {
          type: 'image',
        },
      ],
    },
  ],
}
