// Registry of section block types available in the page builder.
// `defaultData` shape must match what `fields` describes:
// an array field ("type: 'array'") means the section's data is an array of items,
// otherwise the section's data is a flat object keyed by each field's `key`.
export const SECTION_TYPES = [
  {
    type: 'heading',
    label: 'Heading',
    defaultData: { text: 'New heading', subtext: '' },
    fields: [
      { key: 'text', label: 'Heading text', type: 'text' },
      { key: 'subtext', label: 'Subheading (optional)', type: 'textarea' },
    ],
  },
  {
    type: 'text',
    label: 'Text block',
    defaultData: { heading: '', body: 'Write your content here.' },
    fields: [
      { key: 'heading', label: 'Heading (optional)', type: 'text' },
      { key: 'body', label: 'Body text', type: 'textarea' },
    ],
  },
  {
    type: 'image',
    label: 'Image',
    defaultData: { src: '', caption: '' },
    fields: [
      { key: 'src', label: 'Image', type: 'image' },
      { key: 'caption', label: 'Caption (optional)', type: 'text' },
    ],
  },
  {
    type: 'stats',
    label: 'Stat row',
    defaultData: [
      { value: '', label: '' },
      { value: '', label: '' },
      { value: '', label: '' },
    ],
    fields: [
      {
        type: 'array',
        labelKey: 'label',
        fields: [
          { key: 'value', label: 'Value', type: 'text' },
          { key: 'label', label: 'Label', type: 'text' },
        ],
      },
    ],
  },
  {
    type: 'cards',
    label: 'Card grid',
    defaultData: [
      { title: '', desc: '', image: '' },
      { title: '', desc: '', image: '' },
    ],
    fields: [
      {
        type: 'array',
        labelKey: 'title',
        fields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'desc', label: 'Description', type: 'textarea' },
          { key: 'image', label: 'Image (optional)', type: 'image' },
        ],
      },
    ],
  },
]

export function getSectionType(type) {
  return SECTION_TYPES.find((t) => t.type === type)
}
