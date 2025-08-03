import { Publisher } from '../../entities';
import { FormField } from '../../entities/base-form-field';

export const formFields: FormField[] = [
  {
    name: 'superhero',
    label: 'Superhéroe',
    type: 'input',
    validators: {
      required: 'Este campo es obligatorio',
      minlength: 'Mínimo 3 caracteres',
    },
  },
  {
    name: 'publisher',
    label: 'Editorial',
    type: 'select',
    options: Object.values(Publisher),
    validators: {
      required: 'Seleccioná una editorial',
    },
  },
  {
    name: 'alter_ego',
    label: 'Alter Ego',
    type: 'input',
    validators: {
      required: 'Este campo es obligatorio',
      minlength: 'Mínimo 3 caracteres',
    },
  },
  {
    name: 'first_appearance',
    label: 'Primera aparición',
    type: 'input',
    validators: {
      required: 'Este campo es obligatorio',
    },
  },
  {
    name: 'characters',
    label: 'Personajes',
    type: 'input',
    validators: {
      required: 'Este campo es obligatorio',
    },
  },
];
