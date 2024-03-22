import "./Ending.css";

export function Ending(props) {
  return (
    <div
      className={
        "bpmn-stories-ending" +
        (props.isGoodEnding
          ? " bpmn-stories-ending-good"
          : " bpmn-stories-ending-bad")
      }
    >
      <h4>{props.title}</h4>
      <p>{props.text}</p>
      <button onClick={props.resetCount}>Restart Story</button>
    </div>
  );
}
