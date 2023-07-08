import { Controller, useFormContext } from "react-hook-form";
import { ComponentProps } from "../../types/componentType";

import Control from "./control";

const Component: React.FC<ComponentProps> = (props) => {
  // console.log("component render:", component.name);
  const { name, defaultValue } = props;
  const { control } = useFormContext(); // Access form context

  return (
    <>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Control key={props.name} {...props} value={field.value} />
        )}
      />
    </>
  );
};

export default Component;
