export type formBuilderProps = {};

export type defaultProps = {
  name: string;
  title: string;
};

export type componentProps = defaultProps & {
  type: string;
  help?: string;
  required?: boolean;
  submit?: boolean;
};

export type formBoxProps = {
  completeForm: container;
};

export type formBoxAppBarProps = {
  completeForm: container;
  onChange: ({ value }) => void;
};

export type container = {
  forms: formProps[];
  layout: string;
  title: string;
  type: string;
};

export type formProps = defaultProps & {
  components: componentProps[];
  layout: string;
  type: string;
};
