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
  error: Error;
  component: componentProps;
} & dispatchType;

export type componentProps = defaultProps & {
  type: string;
  help?: string;
  required?: boolean;
  submit?: boolean;
  icon: string | undefined;
  value: any | undefined;
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

export type FormProps = defaultProps & {
  children: JSX.Element[];
  layout: string;
  type: string;
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

export type dispatchType = {
  dispatchFormAction: ({ type, payload }) => void;
};

export type Error = {
  message: String;
};
