export default {
  name: 'testimonianze',
  title: 'Testimonianze',
  type: 'document',
  fields: [
    {
      name: 'valutazione',
      title: 'Valutazione',
      type: 'number',
      validation: (rule: any) => rule.min(0) && rule.max(5),
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Primo nome o nickname (opzionale)',
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (rule: any) => rule.required().max(500),
    },
    {
      name: 'approved',
      title: 'Approva',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
}
