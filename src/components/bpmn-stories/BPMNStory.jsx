import { ReactBpmn } from "../../libs/ReactBpmn";
import { ReactDmn } from "../../libs/ReactDmn";
import { ReactForm } from "../../libs/ReactForm";
import { useState, useRef, useEffect } from "react";
import { Question } from "./Question";
import { Message } from "./Message";
import { Ending } from "./Ending";
import { Narration } from "./Narration";
import { BPMNStoryNavigation } from "./BPMNStoryNavigation";
import { StarRating } from "./StarRating";
import "./BPMNStory.css";
import { Link } from "react-router-dom";

export function BPMNStory(props) {
  const [count, setCount] = useState(1);
  const [activeDisplayedFilename, setActiveDisplayedFilename] = useState("");
  const [keywords, setKeywords] = useState(new Map());
  const messagesEndRef = useRef();

  function handleRightButtonClick() {
    setCount(count + 1);
  }
  function handleLeftButtonClick() {
    setCount(count - 1);
  }
  function resetCount() {
    setCount(1);
    setKeywords(new Map());
  }

  function onFilenameButtonClick(filename) {
    setActiveDisplayedFilename(filename);
  }

  var activeMessages = props.conversation
    .filter((thread) => {
      return isDisplayed(thread);
    })
    .map((thread) => {
      return thread.messages;
    })
    .flat();

  var displayedMessages = activeMessages.filter((message) => {
    return message.position <= count;
  });

  var nextMessageExists =
    activeMessages.filter((message) => {
      return message.position === count + 1;
    })[0] !== undefined;

  var activeFiles = props.fileDisplay
    .filter((thread) => {
      return isDisplayed(thread);
    })
    .map((thread) => {
      return thread.files;
    })
    .flat();

  var displayedFiles = activeFiles.filter((files) => {
    return files.position <= count;
  });

  var nextFilesExists =
    activeFiles.filter((files) => {
      return files.position === count + 1;
    })[0] !== undefined;

  var displayedFilenames = displayedFiles.pop().fileNames;

  var disableRightButton =
    !nextMessageExists && !nextFilesExists
      ? true
      : displayedMessages.slice(-1)[0].type === "question" &&
        !keywords.has(count)
      ? true
      : false;

  function isDisplayed(object) {
    const keywordValues = Array.from(keywords.values());
    return (
      object === undefined ||
      object.conditions === undefined ||
      object.conditions.every((condition) => keywordValues.includes(condition))
    );
  }

  const onAnswerButtonClick = (position, keyword) => {
    var currentKeywords = new Map(keywords);
    for (let key of currentKeywords.keys()) {
      if (key >= position) {
        currentKeywords.delete(key);
      }
    }
    currentKeywords.set(position, keyword);
    setKeywords(currentKeywords);
    setCount(position);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [count]);

  useEffect(() => {
    setActiveDisplayedFilename(displayedFilenames[0]);
  }, [displayedFilenames]);

  return (
    <>
      <div className="bpmn-stories-container">
        <div className="bpmn-stories-left-top-box">
          <Link to="/" className="bpmn-stories-return-link">
            Return to Overview!
          </Link>
          <div className="bpmn-stories-conversation">
            {displayedMessages.map((message) => {
              switch (message.type) {
                case "message":
                  return (
                    <Message
                      key={message.position + message.text}
                      participants={props.participants}
                      {...message}
                    />
                  );
                case "question":
                  return (
                    <Question
                      key={message.position + message.question}
                      {...message}
                      onAnswerButtonClick={onAnswerButtonClick}
                      keywords={keywords}
                    />
                  );
                case "narration":
                  return (
                    <Narration
                      key={message.position + message.text}
                      {...message}
                    />
                  );
                case "ending":
                  return (
                    <Ending
                      key={message.position + message.text}
                      {...message}
                      resetCount={resetCount}
                    />
                  );
              }
            })}
            <div ref={messagesEndRef}></div>
          </div>
          <BPMNStoryNavigation
            count={count}
            handleLeftButtonClick={handleLeftButtonClick}
            handleRightButtonClick={handleRightButtonClick}
            disableLeft={count === 1}
            disableRight={disableRightButton}
          />
        </div>
        <div className="bpmn-stories-left-bottom-box">
          <div>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
          </div>
          <div>
            <div className="bpmn-stories-difficulty">
              {props.difficulty.bpmn > 0 ? (
                <StarRating
                  skill="BPMN"
                  valueMin="0"
                  valueMax={props.difficulty.bpmn}
                />
              ) : null}
              {props.difficulty.dmn > 0 ? (
                <StarRating
                  skill="DMN"
                  valueMin="0"
                  valueMax={props.difficulty.dmn}
                />
              ) : null}
              {props.difficulty.forms > 0 ? (
                <StarRating
                  skill="Forms"
                  valueMin="0"
                  valueMax={props.difficulty.forms}
                />
              ) : null}
            </div>
            <div className="bpmn-stories-tags">
              {props.tags.map((tag) => {
                return <div key={tag}>{tag}</div>;
              })}
            </div>
          </div>
        </div>
        <section className="bpmn-stories-right-box">
          <div className="bpmn-stories-viewer-header">
            {displayedFilenames.map((filename, index) => {
              return (
                <button
                  key={filename + index}
                  className={
                    "bpmn-stories-viewer-header-button" +
                    (activeDisplayedFilename === filename
                      ? " selected-file"
                      : "")
                  }
                  onClick={() => onFilenameButtonClick(filename)}
                >
                  {filename.split(["/"]).pop()}
                </button>
              );
            })}
          </div>
          <div className="bpmn-stories-viewer">
            {activeDisplayedFilename.endsWith(".bpmn") ? (
              <ReactBpmn
                key={activeDisplayedFilename}
                url={activeDisplayedFilename}
              />
            ) : null}
            {activeDisplayedFilename.endsWith(".dmn") ? (
              <ReactDmn
                key={activeDisplayedFilename}
                url={activeDisplayedFilename}
              />
            ) : null}
            {activeDisplayedFilename.endsWith(".form") ? (
              <ReactForm
                key={activeDisplayedFilename}
                url={activeDisplayedFilename}
              />
            ) : null}
          </div>
        </section>
      </div>
    </>
  );
}
