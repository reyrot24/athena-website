export default {
  name: 'corsi',
  title: 'Orari corsi',
  type: 'document',
  fields: [
    {
      name: 'corso',
      title: 'Corso',
      type: 'string',
    },
    {
      name: 'lunedi',
      title: 'Lunedì',
      type: 'array',
      of: [
        {
          name: 'ora',
          title: 'Ora',
          type: 'string',
        },
      ],
    },
    {
      name: 'martedi',
      title: 'Martedì',
      type: 'array',
      of: [
        {
          name: 'ora',
          title: 'Ora',
          type: 'string',
        },
      ],
    },
    {
      name: 'mercoledi',
      title: 'Mercoledì',
      type: 'array',
      of: [
        {
          name: 'ora',
          title: 'Ora',
          type: 'string',
        },
      ],
    },
    {
      name: 'giovedi',
      title: 'Giovedì',
      type: 'array',
      of: [
        {
          name: 'ora',
          title: 'Ora',
          type: 'string',
        },
      ],
    },
    {
      name: 'venerdi',
      title: 'Venerdì',
      type: 'array',
      of: [
        {
          name: 'ora',
          title: 'Ora',
          type: 'string',
        },
      ],
    },
    {
      name: 'sabato',
      title: 'Sabato',
      type: 'array',
      of: [
        {
          name: 'ora',
          title: 'Ora',
          type: 'string',
        },
      ],
    },
    {
      name: 'domenica',
      title: 'Domenica',
      type: 'array',
      of: [
        {
          name: 'ora',
          title: 'Ora',
          type: 'string',
        },
      ],
    },
  ],
}
