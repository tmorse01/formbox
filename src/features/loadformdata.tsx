import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { loadForm } from "../helpers/formrequest";
import { FormBoxContext } from "../formbuilder";
const LoadFormData = ({ children }) => {
  const { dispatchFormAction, setSnackbar } = useContext(FormBoxContext);
  const { form } = useParams();

  useEffect(() => {
    if (form) {
      loadForm(form)
        .then((response) => {
          console.log("loadForm response :", response);
          if (response.ok === true) {
            var results = response.results;
            dispatchFormAction({
              type: "update_formState",
              payload: {
                formState: {
                  formJSON: results.formJSON,
                  formName: results.formName,
                },
              },
            });
          }
        })
        .catch((error) => {
          console.error("Error loading form: ", error);
          setSnackbar({
            open: true,
            message:
              "Error loading form by that name. Check the url to see if the form name matches",
            type: "error",
          });
        });
    }
  }, [form, dispatchFormAction, setSnackbar]);

  return children;
};

export default LoadFormData;
