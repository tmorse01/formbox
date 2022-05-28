export type defaultProps = {
  name: string;
  title: string;
};

export type componentProps = defaultProps & {
  type: string;
  help?: string;
  required?: boolean;
  submit?: boolean;
  // onChange: any;
};

export type formBoxProps = {
  completeForm: container;
};

export type container = {
  forms: formProps[];
  layout: string;
  type: string;
};

export type formProps = defaultProps & {
  components: componentProps[];
  layout: string;
  type: string;
};
