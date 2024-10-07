export default {
  name: 'galleria',
  title: 'Galleria',
  type: 'document',
  fields: [
    {
      name: 'nomeImg',
      title: 'Nome Foto',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      option: {
        hotspot: true,
        accept: 'image/*',
      },
    },
  ],
}
