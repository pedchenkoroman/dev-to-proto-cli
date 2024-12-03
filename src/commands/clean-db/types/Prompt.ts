import type { Choice } from './Choice';
import { PromptType } from './PromptType';
import { PromptedArgument } from './PromptedArgument';

export type InputPromptType = {
  type: PromptType;
  message: string;
  required?: boolean;
  name: PromptedArgument;
  ask: () => Promise<string>;
};

export type CheckboxPromptType = {
  type: PromptType;
  message: string;
  name: PromptedArgument;
  choices: Choice[];
  required?: boolean;
  ask: () => Promise<string[]>;
};

export type SelectPromptType = {
  type: PromptType;
  message: string;
  name: PromptedArgument;
  choices: Choice[];
  default?: string;
  ask: () => Promise<string>;
};

export type ConfirmationPromptType = {
  type: PromptType;
  message: string;
  name: PromptedArgument;
  default?: boolean;
  ask: () => Promise<boolean>;
};
