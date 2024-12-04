import { PromptedArgument } from './PromptedArgument';

export type RequiredOptions = Record<
  PromptedArgument.Profile | PromptedArgument.Region | PromptedArgument.Provider,
  string
>;
