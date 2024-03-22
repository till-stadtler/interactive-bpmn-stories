import "./BPMNStoryNavigation.css";

export function BPMNStoryNavigation(props) {
  return (
    <div className="bpmn-stories-navigation">
      <button
        className="bpmn-stories-button-left"
        onClick={props.handleLeftButtonClick}
        disabled={props.disableLeft}
      >
        <span className="material-symbols-outlined">navigate_before</span>
      </button>
      <button
        className="bpmn-stories-button-right"
        onClick={props.handleRightButtonClick}
        disabled={props.disableRight}
      >
        <span className="material-symbols-outlined">navigate_next</span>
      </button>
    </div>
  );
}
