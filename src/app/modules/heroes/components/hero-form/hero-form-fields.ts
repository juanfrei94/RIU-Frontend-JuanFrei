import { Publisher } from '../../entities';
import { FormField } from '../../entities/base-form-field';

export const formFields: FormField[] = [
  {
    name: 'superhero',
    label: 'Superhéroe',
    type: 'input',
    validations: [
      {
        type: 'required'
      },
      {
        type: 'pattern',
        pattern: '^(?![ ._])(?!.* {2})[A-Za-z0-9][A-Za-z0-9 .]{2,49}$'
      }
    ] 
  },
  {
    name: 'publisher',
    label: 'Editorial',
    type: 'select',
    options: Object.values(Publisher),
    validations: [
      {
        type: 'required'
      },
    ]
  },
  {
    name: 'alter_ego',
    label: 'Alter Ego',
    type: 'input',
    validations: [
      {
        type: 'required'
      },
      {
        type: 'pattern',
        pattern: '^(?![ ._])(?!.* {2})[A-Za-z0-9][A-Za-z0-9 .]{2,49}$'
      }
    ],
  },
  {
    name: 'first_appearance',
    label: 'Primera aparición',
    type: 'input',
    validations: [
      {
        type: 'required'
      },
            {
        type: 'pattern',
        pattern: '^(?![ ._])(?!.* {2})[A-Za-z0-9][A-Za-z0-9 .]{2,49}$'
      }
    ]
  },
  {
    name: 'characters',
    label: 'Personajes',
    type: 'input',
    validations: [
      {
        type: 'required'
      },
      {
        type: 'special',
        validator: 'commaList'
      }
    ]
  },
];
