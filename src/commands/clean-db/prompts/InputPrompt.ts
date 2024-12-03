import { InputPromptType, Prompt as IPrompt } from '../types/Prompt';
import { PromptType } from '../types/PromptType';
import { Prompt } from '@inquirer/type';
import { PromptedArgument } from '../types/PromptedArgument';

export class InputPrompt implements InputPromptType, IPrompt {
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
