import type { Component } from "vue";

export type TableItem = {
  [key: string]: unknown;
};

export type TableField = {
  label: string;
  key: string;
};

export type DropdownItem = [key: string | number, value: string | number];

// Inputs
export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "checkbox"
  | "radio"
  | "file"
  | "range";

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
  checked: boolean;
};

export type CheckboxProps = InputFieldProps & {
  checked: boolean;
};

export type FileProps = InputFieldProps & {
  isMultiple: boolean | undefined;
  accept: string | undefined;
};

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
  isbn: string;
  is_published: boolean;
  year_published: number;
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

export type ModalType = "alert" | "confirm" | "content";

export type ModalState = {
  visible: boolean;
  type: ModalType;
  message: string;
  title: string;
  component: Component | undefined;
  resolvePromise: any;
  isFitContent: boolean;
  props: any;
};

export type OpenModalPayload = {
  type: ModalType;
  message: string;
  title: string;
  component: Component | undefined;
  props: any;
  isFitContent: boolean;
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
  id: number | string;
  src: string;
  name: string;
  type: string;
  size: number;
  createdAt: number;
  caption: string;
  // width: number;
  // height: number;
};

export type Theme = "default" | "shoujyo";

export type PaginationSetting = {
  perPage: number;
};

export type DataProps = {
  data: TableItem[] | undefined;
  fields: TableField[] | undefined;
};

export type HorizontalPosition = "start" | "end";
export type VerticalPosition = "top" | "bottom";

export type NavBarObject = {
  backgroundClass: string;
  breakpoint: number;
};

export type TableSlots<T> = {
  pagination: unknown;
  caption: unknown;
  header: { fields: string[]; isLoading: boolean };
  footer: { isLoading: boolean };
  "addition-header": unknown;
  "addition-content": { item: T; isLoading: boolean };
  "search-bar": unknown;
  "no-data": unknown;
  price: { item: T; isLoading: boolean };
  creator: { item: T; isLoading: boolean };
  updater: { item: T; isLoading: boolean };
  status: { item: T; isLoading: boolean };
  created_at: { item: T; isLoading: boolean };
  updated_at: { item: T; isLoading: boolean };
  duration: { item: T; isLoading: boolean };
  publisher: { item: T; isLoading: boolean };
  books: { item: T; isLoading: boolean };
  authors: { item: T; isLoading: boolean };
  author: { item: T; isLoading: boolean };
  is_published: { item: T; isLoading: boolean };
};
