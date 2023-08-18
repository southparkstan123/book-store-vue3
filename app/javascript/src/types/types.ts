export type TableItem =  {
  [key: string]: unknown
}

export type TableField =  {
  label: string,
  key: string
}

export type DropdownItem = {
  id: number,
  [key: string]: unknown
}

export type InputType = 'text' | 'email' | 'password';

export type InputFieldProps = {
  inputId: string,
  className: string,
  inputName: string,
  isRequired: boolean,
  placeholder: string,
  inputValue: string
  inputFieldClass: string,
  isDisabled: boolean
}

export type TextareaFieldProps = InputFieldProps & {
  isReadonly: boolean,
  cols: string,
  rows: string
}

export type ModelType = 'alert' | 'confirm' | 'form';

export type AuthorForm = {
  name: string,
  description: string
}

export type PublisherForm = {
  name: string,
  description: string
}

export type LoginForm = {
  form: {
    username: string;
    password: string;
  }
}

export type RegistrationForm = {
  form: {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
  }
}

export type OpenModalPayload = {
  type: ModelType;
  message: string;
  title: string;
  component: string | "";
}

export type UserInfo = {
  id: string;
  username: string;
  email: string;
}

export type UserState = {
  userInfo: UserInfo | null;
  token: string | null;
}


export type AuthorFormState = {
  form: AuthorForm,
  isLoading: boolean,
  mode: 'add' | 'edit',
  isFormChanged: boolean
}

export type BookForm = {
  name: string,
  abstract: string,
  price: number | null,
  publisher_id: number | null,
  author_ids: Array<number>
}

export type BookFormState = {
  form: BookForm,
  isLoading: boolean,
  mode: 'add' | 'edit',
  isFormChanged: boolean
}

export type PublisherFormState = {
  form: PublisherForm,
  isLoading: boolean,
  mode: 'add' | 'edit',
  isFormChanged: boolean
}