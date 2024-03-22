import DmnJS from "dmn-js/dist/dmn-navigated-viewer.production.min.js";
import "dmn-js/dist/assets/diagram-js.css";
import "dmn-js/dist/assets/dmn-js-decision-table-controls.css";
import "dmn-js/dist/assets/dmn-js-drd.css";
import "dmn-js/dist/assets/dmn-js-literal-expression.css";
import "dmn-js/dist/assets/dmn-js-shared.css";
import "dmn-js/dist/assets/dmn-js-decision-table.css";
import "dmn-js/dist/assets/dmn-font/css/dmn.css";

import { useEffect, useRef, useState } from "react";

export function ReactDmn({ url }) {
  const [diagramXML, setDiagramXML] = useState();
  const containerRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const text = await response.text();
        setDiagramXML(text);
      } catch (error) {
        console.log("error: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!!diagramXML) {
      const container = containerRef.current;

      let dmnViewer = new DmnJS({ container });

      dmnViewer.importXML(diagramXML);

      dmnViewer.on("import.done", (event) => {
        dmnViewer.getActiveViewer().get("canvas").zoom("fit-viewport");
        const view = dmnViewer.getViews()[1];
        dmnViewer.open(view);
      });
    }
  }, [diagramXML]);

  return <div className="react-dmn-diagram-container" ref={containerRef}></div>;
}
