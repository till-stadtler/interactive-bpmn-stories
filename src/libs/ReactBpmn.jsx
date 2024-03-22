import BpmnJS from "bpmn-js/dist/bpmn-navigated-viewer.production.min.js";
import ElementTemplateIconRenderer from "@bpmn-io/element-template-icon-renderer";

import { useEffect, useRef, useState } from "react";

export function ReactBpmn({ url }) {
  const [bpmnXML, setBpmnXML] = useState();
  const containerRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const text = await response.text();
        setBpmnXML(text);
      } catch (error) {
        console.log("error: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!!bpmnXML) {
      const container = containerRef.current;

      let bpmnViewer = new BpmnJS({
        additionalModules: [ElementTemplateIconRenderer],
        container,
      });

      bpmnViewer.importXML(bpmnXML);

      bpmnViewer.on("import.done", (event) => {
        bpmnViewer.get("canvas").zoom("fit-viewport");
      });
    }
  }, [bpmnXML]);

  return <div className="react-form-container" ref={containerRef}></div>;
}
