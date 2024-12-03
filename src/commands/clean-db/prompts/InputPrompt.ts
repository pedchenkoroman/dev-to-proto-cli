import { Prompt } from '@inquirer/type';

import { PromptType } from '../types/PromptType.js';

import type { InputPromptType } from '../types/Prompt';
import type { PromptedArgument } from '../types/PromptedArgument';

export class InputPrompt implements InputPromptType {
  message: string;
  required = false;
  name: PromptedArgument;
  type: PromptType = PromptType.Input;

  constructor(
    input: { message: string; required: boolean; name: PromptedArgument },
    private prompt: Prompt<string, any>,
  ) {
    this.required = input.required;
    this.message = input.message;
    this.name = input.name;
  }

  ask(): Promise<string> {
    return this.prompt(this);
  }
}
