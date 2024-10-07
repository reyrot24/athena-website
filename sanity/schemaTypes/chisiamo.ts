export default {
  name: 'chisiamo',
  title: 'Chi siamo',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'Id',
      type: 'number',
    },
    {
      name: 'nome',
      title: 'Nome',
      type: 'string',
    },
    {
      name: 'descrizione',
      title: 'Descrizione',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    },
    {
      name: 'lavoro',
      title: 'Lavoro',
      type: 'string',
    },
    {
      name: 'foto',
      title: 'Foto',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}
