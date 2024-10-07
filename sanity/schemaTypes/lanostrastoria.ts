export default {
  name: 'lanostrastoria',
  title: 'La nostra storia',
  type: 'document',
  fields: [
    {
      name: 'titolo',
      title: 'Titolo',
      type: 'string',
    },
    {
      name: 'data',
      title: 'Data',
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
  ],
}
