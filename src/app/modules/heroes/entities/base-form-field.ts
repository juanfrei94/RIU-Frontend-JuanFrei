type FieldType = 'input' | 'select';

interface FieldValidators {
  required?: string;
  minlength?: string;
}

interface BaseFormField {
  name: string;
  label: string;
  type: FieldType;
  validators?: FieldValidators;
}

interface InputField extends BaseFormField {
  type: 'input';
}

interface SelectField extends BaseFormField {
  type: 'select';
  options: string[];
}

export type FormField = InputField | SelectField;
