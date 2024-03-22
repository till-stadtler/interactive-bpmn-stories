import { CombinedStories } from "./story-files/CombinedStories";
import { useState } from "react";
import RangeSlider from "react-range-slider-input";
import { Link } from "react-router-dom";
import { StarRating } from "./StarRating";
import QRCode from "react-qr-code";
import "react-range-slider-input/dist/style.css";
import "./BPMNStoriesHome.css";
import CamundaConLogoWhite from "/icons/ccon-logo-white-2024.svg";

export function BPMNStoriesHome() {
  var [bpmnDifficulty, setBpmnDifficulty] = useState([0, 5]);
  var [dmnDifficulty, setDmnDifficulty] = useState([0, 5]);
  var [formsDifficulty, setFormsDifficulty] = useState([0, 5]);
  var [activeTags, setActiveTags] = useState(new Set());
  var [sortBy, setSortBy] = useState("easiest");

  function onBPMNSliderInputChange(value, userInteraction) {
    setBpmnDifficulty(value);
  }

  function onDMNSliderInputChange(value, userInteraction) {
    setDmnDifficulty(value);
  }

  function onFormsSliderInputChange(value, userInteraction) {
    setFormsDifficulty(value);
  }

  function addOrRemoveTag(tag) {
    var activeTagsList = new Set(activeTags);
    if (activeTagsList.has(tag)) {
      activeTagsList.delete(tag);
    } else {
      activeTagsList.add(tag);
    }
    setActiveTags(activeTagsList);
  }

  var availableTags = [
    ...new Set(
      CombinedStories.filter((story) => {
        return story.tags;
      })
        .map((story) => {
          return story.tags;
        })
        .flat()
    ),
  ];

  const inRange = (num, min, max) => num >= min && num <= max;

  var activeStories = CombinedStories.filter((story) => {
    return (
      (activeTags.size == 0 ||
        story.tags?.some((tag) => activeTags.has(tag))) &&
      inRange(story.difficulty?.bpmn, bpmnDifficulty[0], bpmnDifficulty[1]) &&
      inRange(story.difficulty?.dmn, dmnDifficulty[0], dmnDifficulty[1]) &&
      inRange(story.difficulty?.forms, formsDifficulty[0], formsDifficulty[1])
    );
  }).sort((a, b) => {
    if (sortBy == "easiest") {
      return a.difficulty.bpmn + a.difficulty.dmn + a.difficulty.forms >
        b.difficulty.bpmn + b.difficulty.dmn + b.difficulty.forms
        ? 1
        : -1;
    } else {
      return a.difficulty.bpmn + a.difficulty.dmn + a.difficulty.forms <
        b.difficulty.bpmn + b.difficulty.dmn + b.difficulty.forms
        ? 1
        : -1;
    }
  });

  return (
    <>
      <div className="bpmn-stories-home-container">
        <section className="bpmn-stories-home-left">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "2rem",
            }}
          >
            <img src={CamundaConLogoWhite} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h1>Interactive</h1>
              <h2>BPMN Stories</h2>
            </div>
          </div>
          <div className="hide-on-mobile mobile-cta-parent">
            <div className="mobile-cta">TRY OUT ON MOBILE!</div>
            <div className="qr-code">
              <QRCode value="https://camunda-community-hub.github.io/interactive-bpmn-stories" />
            </div>
          </div>
          <div className="filter-options">
            <div className="filter">
              <h2>Filter:</h2>
              <label>
                <StarRating
                  skill="BPMN difficulty"
                  valueMin={bpmnDifficulty[0]}
                  valueMax={bpmnDifficulty[1]}
                />
                <RangeSlider
                  id="range-slider"
                  className="bpmn-stories-home-filter-slider"
                  min="0"
                  max="5"
                  step="1"
                  value={bpmnDifficulty}
                  onInput={onBPMNSliderInputChange}
                />
              </label>
              <label>
                <StarRating
                  skill="DMN difficulty"
                  valueMin={dmnDifficulty[0]}
                  valueMax={dmnDifficulty[1]}
                />
                <RangeSlider
                  id="range-slider"
                  className="bpmn-stories-home-filter-slider"
                  min="0"
                  max="5"
                  step="1"
                  value={dmnDifficulty}
                  onInput={onDMNSliderInputChange}
                />
              </label>
              <label>
                <StarRating
                  skill="Forms difficulty"
                  valueMin={formsDifficulty[0]}
                  valueMax={formsDifficulty[1]}
                />
                <RangeSlider
                  id="range-slider"
                  className="bpmn-stories-home-filter-slider"
                  min="0"
                  max="5"
                  step="1"
                  value={formsDifficulty}
                  onInput={onFormsSliderInputChange}
                />
              </label>
            </div>
            <div>
              <h2>Tags:</h2>
              <div className="bpmn-stories-home-tags">
                {availableTags.map((tag) => {
                  return (
                    <button
                      key={tag}
                      className={
                        activeTags.has(tag) ? "active-tag" : "inactive-tag"
                      }
                      onClick={() => addOrRemoveTag(tag)}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <h2>Sort by:</h2>
              <select
                className="bpmn-stories-home-sort-by-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="easiest">Easiest first</option>
                <option value="hardest">Hardest first</option>
              </select>
            </div>
          </div>
        </section>
        <section className="bpmn-stories-home-right">
          {activeStories.map((story) => {
            return (
              <Link
                to={story.id}
                key={story.id}
                className="bpmn-stories-home-card-story"
              >
                <div className="bpmn-stories-home-card-story-cover">
                  <div>
                    <h2>{story.title}</h2>
                    <p>{story.description}</p>
                  </div>
                  <div>
                    <div className="bpmn-stories-home-difficulty">
                      {story.difficulty.bpmn > 0 ? (
                        <StarRating
                          skill="BPMN"
                          valueMin="0"
                          valueMax={story.difficulty.bpmn}
                        />
                      ) : null}
                      {story.difficulty.dmn > 0 ? (
                        <StarRating
                          skill="DMN"
                          valueMin="0"
                          valueMax={story.difficulty.dmn}
                        />
                      ) : null}
                      {story.difficulty.forms > 0 ? (
                        <StarRating
                          skill="Forms"
                          valueMin="0"
                          valueMax={story.difficulty.forms}
                        />
                      ) : null}
                    </div>
                    <div className="bpmn-stories-home-tags">
                      {story.tags.map((tag) => {
                        return <div key={tag}>{tag}</div>;
                      })}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      </div>
    </>
  );
}
