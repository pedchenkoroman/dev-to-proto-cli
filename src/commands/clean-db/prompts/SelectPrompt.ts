import { SelectPromptType, Prompt as IPrompt } from '../types/Prompt';
import { Choice } from '../types/Choice';
import { PromptType } from '../types/PromptType';
import { Prompt } from '@inquirer/type';
import { PromptedArgument } from '../types/PromptedArgument';

export class SelectPrompt implements SelectPromptType, IPrompt {
  message: string;
  choices: Choice[];
  type = PromptType.Select;
  default: string;
  name: PromptedArgument;

  constructor(
    { message, choices, name, ...rest }: Omit<SelectPromptType, 'type'>,
    private prompt: Prompt<string, any>,
  ) {
    this.message = message;
    this.choices = choices;
    this.name = name;
    this.default = rest.default || '';
  }

  ask(): Promise<string> {
    return this.prompt(this);
  }
}
