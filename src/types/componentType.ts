import { AlertColor } from "@mui/material";
import { SetStateAction } from "react";
import { FieldValues, DeepMap, FieldError } from "react-hook-form";

type Dispatch = React.Dispatch<Action>;

type Action = { type: string; payload?: any };

export type formBuilderProps = {};

export type formDataProps = {
  formName: string;
  formJSON: object;
  username: string;
};

export type defaultProps = {
  name: string;
  title: string;
};

export type CompProps = {
  key: string;
  component: componentProps;
};

export type componentProps = defaultProps & {
  type: string;
  help?: string;
  required?: boolean;
  submit?: boolean;
  icon: string | undefined;
  defaultValue?: string | number | boolean | undefined;
  options?: Option[];
};

export type formBoxAppBarProps = {
  completeForm: container | undefined;
  formName: string;
  onChange: ({ value }) => void;
};

export type container = {
  forms: form[];
  layout: string;
  title: string;
  name: string;
  type: string;
};

export type FormBoxProps = {
  formState: FormState;
};

export type ContainerProps = {
  formState: FormState;
  initialValues: FieldValues;
  onSubmit: (values, e) => void;
  onError: (values, e) => void;
};

export type FormProps = {
  form: form;
};

export type form = defaultProps & {
  components: componentProps[];
  layout: string;
  type: string;
};

export type FormState = {
  formJSON: container | undefined;
  formName: string | undefined;
};

export type FormBoxContextType = {
  user: User;
  handleSetUser: (user: User) => void;
  listOfForms: formDataProps[];
  setListOfForms: React.Dispatch<SetStateAction<formDataProps[]>>;
  formState: FormState;
  dispatchFormAction: Dispatch;
  snackbar: SnackbarProps;
  setSnackbar: (params: SnackbarProps) => void;
};

export type User = {
  username: string | undefined;
};

export type SnackbarProps = {
  open: boolean;
  message: string;
  type: AlertColor | undefined;
};

export type Error = {
  message: String;
};

export type TextFieldProps = {
  name: string;
  title: string;
  help: string | undefined;
  required?: boolean;
  defaultValue: string;
};

export type FieldErrors<TFieldValues extends FieldValues = FieldValues> =
  DeepMap<TFieldValues, FieldError>;

export type SwitchProps = {
  name: string;
  title: string;
  help?: string | undefined;
  required?: boolean;
  defaultValue: boolean;
};

export type SelectProps = {
  name: string;
  title: string;
  help?: string;
  options?: Option[];
  required?: boolean;
  defaultValue: string;
};

export type Option = {
  label: string;
  value: string;
};
