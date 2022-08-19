import { JSONEditor } from "svelte-jsoneditor/dist/jsoneditor.js";
import { useEffect, useRef } from "react";
import "../css/jsoneditor.css";

export default function FormBoxJSONEditor(props) {
  const refContainer = useRef(null);
  const refEditor = useRef(null);

  useEffect(() => {
    // create editor
    // console.log("create editor", refContainer.current);
    refEditor.current = new JSONEditor({
      target: refContainer.current,
      props: {},
    });

    return () => {
      // destroy editor
      if (refEditor.current) {
        // console.log("destroy editor");
        refEditor.current.destroy();
        refEditor.current = null;
      }
    };
  }, []);

  // update props
  useEffect(() => {
    if (refEditor.current) {
      // console.log("update props", props);
      refEditor.current.updateProps(props);
    }
  }, [props]);

  return <div className="formbox-json-editor" ref={refContainer}></div>;
}
