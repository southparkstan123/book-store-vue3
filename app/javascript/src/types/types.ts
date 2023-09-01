export type TableItem = {
  [key: string]: unknown;
};

export type TableField = {
  label: string;
  key: string;
};

export type DropdownItem = [ key: number, value: string ];

// Inputs
export type InputType = "text" | "email" | "password" | "number" | "checkbox" | "radio" | "file";

export type InputFieldProps = {
  inputId: string;
  className: string;
  inputName: string;
  isRequired: boolean;
  placeholder: string;
  inputValue: string | number | string[] | boolean;
  inputFieldClass: string;
  isDisabled: boolean;
};

export type RangeProps = {
  step: number | undefined;
  min: number | undefined;
  max: number | undefined;
};

export type TextareaFieldProps = InputFieldProps & {
  isReadonly: boolean;
  cols: string;
  rows: string;
};

export type RadioButtonProps = InputFieldProps & {
  checked: boolean 
}

export type CheckboxProps = InputFieldProps & {
  checked: boolean 
}

export type FileProps = InputFieldProps & {
  isMultiple: boolean | undefined 
}

export type AuthorForm = {
  name: string;
  description: string;
};

export type PublisherForm = {
  name: string;
  description: string;
};

export type LoginForm = {
  form: {
    username: string;
    password: string;
  };
};

export type RegistrationForm = {
  form: {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
  };
};

export type UserInfo = {
  id: string;
  username: string;
  email: string;
};

export type UserState = {
  userInfo: UserInfo | null;
  token: string | null;
};

export type AuthorFormState = {
  form: AuthorForm;
  isLoading: boolean;
  mode: "add" | "edit";
  isFormChanged: boolean;
};

export type BookForm = {
  name: string;
  abstract: string;
  price: number;
  publisher_id: number | null;
  author_ids: Array<number>;
};

export type BookFormState = {
  form: BookForm;
  isLoading: boolean;
  mode: "add" | "edit";
  isFormChanged: boolean;
};

export type PublisherFormState = {
  form: PublisherForm;
  isLoading: boolean;
  mode: "add" | "edit";
  isFormChanged: boolean;
};

export type ModuleType = "book" | "author" | "publisher";

export type ModalType = "alert" | "confirm" | "form";

export type ModalState = {
  visible: boolean;
  type: ModalType;
  message: string;
  title: string;
  component: string;
  resolvePromise: any;
};

export type OpenModalPayload = {
  type: ModalType;
  message: string;
  title: string;
  component: string | "";
};

export type ButtonProps = {
  isDisabled: boolean;
  buttonType: "submit" | "button";
  textClass: string;
  backgroundClass: string;
  disabledClass: string;
};

export type PaginationProps = {
  page: number;
  pages: number;
};

export type Pagination = {
  currentPage: number;
  pages: number;
  total: number;
  count: number;
  perPage: number;
};

export type ActionType = "view" | "edit" | "delete";

export type ImageFile = {
  src: string;
  name: string;
  type: string;
  size: number;
  createdAt: number;
}
