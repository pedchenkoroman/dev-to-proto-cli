import type { Choice } from './Choice';
import { PromptType } from './PromptType';
import { PromptedArgument } from './PromptedArgument';

export type Prompt = {
  message: string;
  type: PromptType;
  name: PromptedArgument;
  ask: (args: any) => Promise<string | string[]>;
};

export type InputPromptType = {
  type: PromptType;
  message: string;
  required?: boolean;
};

export type CheckboxPromptType = {
  type: PromptType;
  message: string;
  name: PromptedArgument;
  choices: Choice[];
  required?: boolean;
};

export type SelectPromptType = {
  type: PromptType;
  message: string;
  name: PromptedArgument;
  choices: Choice[];
  default?: string;
};
