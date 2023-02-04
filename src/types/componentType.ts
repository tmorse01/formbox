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

export type componentProps = defaultProps & {
  type: string;
  help?: string;
  required?: boolean;
  submit?: boolean;
  iconName: string | undefined;
};

export type formBoxAppBarProps = {
  completeForm: container | undefined;
  formName: string;
  onChange: ({ value }) => void;
};

export type container = {
  forms: formProps[];
  layout: string;
  title: string;
  name: string;
  type: string;
};

export type formProps = defaultProps & {
  components: componentProps[];
  layout: string;
  type: string;
};

export type FormBoxContextType = {
  formState: {
    formJSON: container | undefined;
    formName: string;
  };
  user: {
    username: string | null | undefined;
    token: string | null | undefined;
  };
  listOfForms: formDataProps[];
};
