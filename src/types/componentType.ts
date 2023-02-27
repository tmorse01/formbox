import {
  FieldValues,
  UseFormRegister,
  DeepMap,
  FieldError,
} from "react-hook-form";

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
  register: UseFormRegister<FieldValues>;
  error: FieldError;
};

export type componentProps = defaultProps & {
  type: string;
  help?: string;
  required?: boolean;
  submit?: boolean;
  icon: string | undefined;
  defaultValue: any | undefined;
};

export type formBoxAppBarProps = {
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
  dispatchFormAction: Dispatch;
  setSnackbar: any;
};

export type ContainerProps = {
  formState: FormState;
  initialValues: FieldValues;
  onSubmit: (values, e) => void;
  onError: (values, e) => void;
};

export type form = {
  form: FormProps;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

export type FormProps = defaultProps & {
  components: componentProps[];
  layout: string;
  type: string;
  mode: "onChange" | "onBlur" | "onSubmit" | "onTouched" | "all" | undefined;
};

export type FormState = {
  formJSON: container | undefined;
  formName: string | undefined;
};

export type FormBoxContextType = {
  user: {
    username: string | null | undefined;
    token: string | null | undefined;
  };
  listOfForms: formDataProps[];
};

export type Error = {
  message: String;
};

export type TextFieldProps = {
  name: string;
  title: string;
  help: string | undefined;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  error: FieldError;
};

export type FieldErrors<TFieldValues extends FieldValues = FieldValues> =
  DeepMap<TFieldValues, FieldError>;
