type FieldType = 'input' | 'select';

interface PatternValidation {
  type: 'pattern';
  pattern: string;
}
interface SpecialValidation {
  type: 'special';
  validator: string;
}

type Validation = { type: 'required' } | PatternValidation | SpecialValidation;

export interface BaseFormField {
  name: string;
  label: string;
  type: FieldType;
  validations: Validation[];
}

interface InputField extends BaseFormField {
  type: 'input';
}

interface SelectField extends BaseFormField {
  type: 'select';
  options: string[];
}

export type FormField = InputField | SelectField;
