export default {
  name: 'corsiImg',
  title: 'Corsi Immagini',
  type: 'document',
  fields: [
    {
      name: 'nome',
      title: 'Nome',
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
