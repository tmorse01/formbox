import { CompProps } from "../../types/componentType";
import Control from "./control";

const Component: React.FC<CompProps> = ({ component }) => {
  // console.log("component render:", component.name);
  return <Control key={component.name} component={component} />;
};

export default Component;
