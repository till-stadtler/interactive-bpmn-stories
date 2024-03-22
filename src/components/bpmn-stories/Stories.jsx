import { useParams } from "react-router-dom";
import { BPMNStory } from "./BPMNStory";
import { CombinedStories } from "./story-files/CombinedStories";

export function Stories() {
  let { storyId } = useParams();

  const story = CombinedStories.filter((story) => {
    return storyId === story.id;
  });

  return (
    <>
      {story.length === 1 ? (
        <BPMNStory {...story[0]} />
      ) : (
        <p>No story found!</p>
      )}
    </>
  );
}
