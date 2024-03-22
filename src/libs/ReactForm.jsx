import { Form } from "@bpmn-io/form-js-viewer";
import "@bpmn-io/form-js/dist/assets/form-js.css";

import { useEffect, useRef, useState } from "react";

export function ReactForm({ url }) {
  const [formJSON, setFormJSON] = useState();
  const containerRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const text = await response.text();
        setFormJSON(text);
      } catch (error) {
        console.log("error: ", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (!!formJSON) {
      const container = containerRef.current;

      let formViewer = new Form({ container });

      formViewer.importSchema(JSON.parse(formJSON));
    }
  }, [formJSON]);

  return <div className="react-form-container" ref={containerRef}></div>;
}
