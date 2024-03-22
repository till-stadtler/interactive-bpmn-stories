interface bpmnStory {
  id: string;
  title: string;
  description: string;
  participants: participant[];
  difficulty: difficulty;
  tags: string[];
  conversation: thread[];
  fileDisplay: fileThread[];
}

interface participant {
  id: string;
  protagonist: boolean;
  role: string;
  name: string;
  emoji: string;
}

interface difficulty {
  bpmn: number;
  dmn: number;
  forms: number;
}

interface thread {
  conditions: string[];
  messages: (narration | message | question | ending)[];
}

interface narration {
  position: number;
  type: string;
  text: string;
}

interface message {
  position: number;
  type: string;
  participant: string;
  text: string;
}

interface question {
  position: number;
  type: string;
  question: string;
  answers: answer[];
}

interface answer {
  keyword: string;
  text: string;
}

interface ending {
  position: number;
  type: string;
  isGoodEnding: boolean;
  title: string;
  text: string;
}

interface fileThread {
  conditions: string[];
  files: file[];
}

interface file {
  position: number;
  fileNames: string[];
}
