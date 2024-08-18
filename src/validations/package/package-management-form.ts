import { z } from 'zod';
import { validationErrors } from '@/constants/validation';

export const packageManagementFormSchema = z.object({
  name: z.string({ required_error: validationErrors.required }).min(1, validationErrors.minLength(1)),
  price: z.number({
    required_error: validationErrors.required,
    invalid_type_error: validationErrors.required,
  }),
  duration: z
    .number({
      required_error: validationErrors.required,
      invalid_type_error: validationErrors.required,
    })
    .min(1, validationErrors.minNumber(1)),
});
