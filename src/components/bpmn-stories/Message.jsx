import "./Message.css";

export function Message(props) {
  const { participants, participant, text } = props;

  const participantInfo = participants.filter((p) => {
    return p.id === participant;
  })[0];

  const participantEntry = participants.indexOf(participantInfo);

  return (
    <div
      className={
        participantInfo.protagonist
          ? " bpmn-story-message-left"
          : " bpmn-story-message-right"
      }
    >
      <div
        className={
          "bpmn-story-message-color-" +
          participantEntry +
          (participantInfo.protagonist
            ? " bpmn-story-message-card-right"
            : " bpmn-story-message-card-left")
        }
      >
        <div className="bpmn-story-message-name">
          {participantInfo.name}{" "}
          {participantInfo.role ? " (" + participantInfo.role + ")" : null}
        </div>
        {text}
      </div>
      <span className="bpmn-story-message-icon">{participantInfo.emoji}</span>
    </div>
  );
}
