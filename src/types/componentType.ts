import { AlertColor } from "@mui/material";
import { Ref, SetStateAction } from "react";
import { FieldValues, DeepMap, FieldError } from "react-hook-form";

type Dispatch = React.Dispatch<Action>;

type Action = { type: string; payload?: any };

export type formBuilderProps = {};

export type formDataProps = {
  formName: string;
  formJSON: object;
  username: string;
};

export type DefaultProps = {
  name: string;
  title: string;
};

export type ComponentProps = {
  type: "textfield" | "switch" | "select" | "radiogroup";
} & ControlTypes;

export type ControlTypes =
  | TextFieldProps
  | CheckboxProps
  | SelectProps
  | RadioGroupProps;

// export type componentProps = defaultProps & {
//   type: string;
//   help?: string;
//   required?: boolean;
//   submit?: boolean;
//   icon: string | undefined;
//   defaultValue?: string | number | boolean | undefined;
//   options?: Option[];
// };

export type FormBoxAppBarProps = {
  completeForm: container | undefined;
  formName: string;
  onChange: ({ value }) => void;
};

export type container = {
  forms: FormProps[];
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

export type FormProps = DefaultProps & {
  components: ComponentProps[];
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
  value: string | undefined;
};

export type FieldErrors<TFieldValues extends FieldValues = FieldValues> =
  DeepMap<TFieldValues, FieldError>;

export type CheckboxProps = {
  name: string;
  title: string;
  help?: string | undefined;
  required?: boolean;
  defaultValue: boolean;
  value: boolean | undefined;
};

export type SelectProps = {
  name: string;
  title: string;
  help?: string;
  options: Option[];
  required?: boolean;
  defaultValue: string;
  value: string | undefined;
};

export type Option = {
  label: string;
  value: string;
};

export type RadioGroupProps = {
  name: string;
  title: string;
  help?: string;
  options: Option[];
  required?: boolean;
  defaultValue: string;
  value: string | undefined;
};

export type ButtonProps = {
  name: string;
  title: string;
  submit?: boolean;
  icon: string | undefined;
};
