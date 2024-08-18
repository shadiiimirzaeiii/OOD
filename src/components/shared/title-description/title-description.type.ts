import { flexPropDefs } from '@radix-ui/themes';
import { typoVariant } from '@/theme/typo-variants';

export type TitleDescriptionProps = {
  title: string | number;
  description: string | number;
  titleVariant?: keyof typeof typoVariant;
  descriptionVariant?: keyof typeof typoVariant;
  gap?: (typeof flexPropDefs)['gap']['values'][number];
  titleColor?: string;
  descriptionColor?: string;
};
