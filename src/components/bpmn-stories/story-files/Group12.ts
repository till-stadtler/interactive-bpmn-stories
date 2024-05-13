import dummyBpmnUrl from "/bpmn-stories/group12/dummy.bpmn?url";
import dummyDmnUrl from "/bpmn-stories/group12/dummy.dmn?url";
import dummyFormUrl from "/bpmn-stories/group12/dummy.form?url";

export const Group12: bpmnStory[] = [
  {
    id: "group12id",
    title: "Group12 - Title",
    description: "Group12 - Description",
    participants: [
      {
        id: "1",
        protagonist: true,
        role: "Trainer",
        name: "Jess",
        emoji: "👩🏿",
      },
      {
        id: "2",
        protagonist: false,
        role: "Student",
        name: "Wolfgang",
        emoji: "🙋🏻‍♂️",
      },
    ],
    difficulty: {
      bpmn: 1,
      dmn: 0,
      forms: 0,
    },
    tags: ["BPMN"],
    conversation: [
      {
        conditions: [],
        messages: [
          {
            position: 1,
            type: "narration",
            text: "This is a BPMN story template for you to work with!",
          },
          {
            position: 2,
            type: "message",
            participant: "1",
            text: "This text is said by participant number 1. They were chosen to be the protagonist, placing the icon on the right side and speech bubble on the left side.",
          },
          {
            position: 3,
            type: "message",
            participant: "2",
            text: "This text is said by participant number 2. The icon and speech bubble are reversed.",
          },
          {
            position: 4,
            type: "narration",
            text: "You can use the type narration to add additional context. You can use up to 4 different participants!",
          },
          {
            position: 5,
            type: "question",
            question: "This is a question?",
            answers: [
              {
                keyword: "q1-incorrect-1",
                text: "Each answer has a specific keyword which is used to progress in the story.",
              },
              {
                keyword: "q1-incorrect-2",
                text: 'The first two answers lead to "bad endings".',
              },
              {
                keyword: "q1-correct-1",
                text: "This is the correct answer.",
              },
            ],
          },
        ],
      },
      {
        conditions: ["q1-incorrect-1"],
        messages: [
          {
            position: 6,
            type: "ending",
            isGoodEnding: false,
            title: "Wrong Answer",
            text: "This is an example for a bad ending.",
          },
        ],
      },
      {
        conditions: ["q1-incorrect-2"],
        messages: [
          {
            position: 6,
            type: "narration",
            text: "We can also add conversation before our bad ending.",
          },
          {
            position: 7,
            type: "ending",
            isGoodEnding: false,
            title: "Different Title",
            text: "This is another bad ending with a different title.",
          },
        ],
      },
      {
        conditions: ["q1-correct-1"],
        messages: [
          {
            position: 6,
            type: "narration",
            text: "You can create multiple threads and use keywords to let your story play out the way you want it to!",
          },
          {
            position: 7,
            type: "message",
            participant: "1",
            text: "Displaying BPMN, DMN and Forms has the same thread/keyword system.",
          },
          {
            position: 8,
            type: "message",
            participant: "2",
            text: "But don't make your story too complex! Using multiple threads that depend on different keywords is optional.",
          },
          {
            position: 9,
            type: "message",
            participant: "1",
            text: "We made to the end of our demo story!",
          },
          {
            position: 10,
            type: "ending",
            isGoodEnding: true,
            title: "The End",
            text: "Have fun creating your own stories!",
          },
        ],
      },
    ],
    fileDisplay: [
      {
        conditions: [],
        files: [
          {
            position: 1,
            fileNames: [dummyBpmnUrl],
          },
          {
            position: 6,
            fileNames: [dummyDmnUrl],
          },
          {
            position: 8,
            fileNames: [dummyFormUrl],
          },
        ],
      },
    ],
  },
];
