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
  editable: boolean;
};

export type DefaultComponentProps = {
  name: string;
  title: string;
  help: string | undefined;
  required?: boolean;
  defaultValue: string;
};

export type EditableComponents = ComponentProps | FormProps | ContainerProps;

export type ComponentProps = {
  editable: boolean;
  type: "textfield" | "switch" | "select" | "radiogroup";
} & ComponentTypes;

export type ComponentTypes =
  | TextFieldProps
  | CheckboxProps
  | SelectProps
  | RadioGroupProps;

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
  editable: boolean;
};

export type ContainerProps = DefaultProps &
  container & {
    initialValues: FieldValues;
    onSubmit: (values, e) => void;
    onError: (values, e) => void;
  };

export type FormProps = DefaultProps & {
  components: ComponentProps[];
  layout: string;
  type: string;
  editable: boolean;
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

export type TextFieldProps = DefaultComponentProps;

export type FieldErrors<TFieldValues extends FieldValues = FieldValues> =
  DeepMap<TFieldValues, FieldError>;

export type CheckboxProps = DefaultComponentProps;

export type SelectProps = DefaultComponentProps & {
  options: Option[];
};

export type Option = {
  label: string;
  value: string;
};

export type RadioGroupProps = DefaultComponentProps & {
  options: Option[];
};

export type ButtonProps = {
  name: string;
  title: string;
  submit?: boolean;
  icon: string | undefined;
};
