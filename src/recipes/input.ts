import { inputConfig, type InputState } from '../components/input.config';

export interface GetInputClassesOptions {
  state?: InputState;
  extraClasses?: string;
}

export const getInputClasses = ({
  state = 'default',
  extraClasses = '',
}: GetInputClassesOptions = {}): string => {
  const classes = [inputConfig.baseClass, inputConfig.states[state], extraClasses].filter(Boolean);
  return classes.join(' ').trim();
};
