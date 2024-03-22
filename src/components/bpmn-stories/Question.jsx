import "./Question.css";

import { useEffect, useState } from "react";

export function Question(props) {
  const [showAnswers, setShowAnswers] = useState(false);

  function onShowAnswersButtonClick() {
    setShowAnswers(true);
  }

  function onButtonClick(position, keyword) {
    props.onAnswerButtonClick(position, keyword);
  }

  useEffect(() => {
    if (props.keywords.has(props.position)) {
      setShowAnswers(true);
    }
  }, []);

  return (
    <div className="bpmn-stories-question">
      <h4>{props.question}</h4>
      <div className="show-answers-button-div">
        <button
          className={
            "show-answers-button" + (!showAnswers ? " shown" : " hidden")
          }
          onClick={onShowAnswersButtonClick}
        >
          Show answers!
        </button>
      </div>
      <div className="bpmn-stories-answers">
        {props.answers.map((answer) => {
          return (
            <div
              onClick={() => {
                onButtonClick(props.position, answer.keyword);
              }}
              key={answer.keyword}
              className={
                "bpmn-stories-answer" +
                (props.keywords.get(props.position) === answer.keyword
                  ? " selected"
                  : " not-selected") +
                (showAnswers ? " shown" : " hidden")
              }
            >
              {answer.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
