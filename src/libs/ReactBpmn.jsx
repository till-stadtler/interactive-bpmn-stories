// import BpmnModeler from "bpmn-js/lib/Modeler";
import TouchModule from "diagram-js/lib/navigation/zoomscroll";
import MoveCanvasModule from "diagram-js/lib/navigation/movecanvas";
import KeyboardMoveModule from "diagram-js/lib/navigation/keyboard-move";
import BpmnViewer from "bpmn-js/lib/NavigatedViewer";
import ElementTemplateIconRenderer from "@bpmn-io/element-template-icon-renderer";
import TokenSimulationModule from "bpmn-js-token-simulation/lib/viewer";
import "bpmn-js-token-simulation/assets/css/bpmn-js-token-simulation.css";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";

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

      let bpmnViewer = new BpmnViewer({
        container,
        additionalModules: [
          ElementTemplateIconRenderer,
          TokenSimulationModule,
          TouchModule,
          MoveCanvasModule,
          KeyboardMoveModule,
        ],
      });

      bpmnViewer.importXML(bpmnXML);

      bpmnViewer.on("import.done", (event) => {
        // bpmnViewer.get("canvas").zoom("fit-viewport");
        // bpmnViewer.get("zoomScroll").stepZoom(-0.2);
      });
    }
  }, [bpmnXML]);

  return <div className="react-form-container" ref={containerRef}></div>;
}
