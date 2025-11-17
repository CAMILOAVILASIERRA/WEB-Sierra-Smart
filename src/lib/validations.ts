import { z } from 'zod';

export const appointmentSchema = z.object({
  name: z.string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  email: z.string()
    .trim()
    .email('Email inválido')
    .max(255, 'El email no puede exceder 255 caracteres'),
  phone: z.string()
    .trim()
    .regex(/^[+]?[0-9\s-]{10,20}$/, 'Número de teléfono inválido')
    .optional()
    .or(z.literal('')),
  company: z.string()
    .trim()
    .max(100, 'El nombre de la empresa no puede exceder 100 caracteres')
    .optional()
    .or(z.literal('')),
  service_interest: z.enum(['real_estate', 'hotel', 'ai_agent', 'systems', 'other'], {
    errorMap: () => ({ message: 'Por favor selecciona un servicio' })
  }),
  message: z.string()
    .trim()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(1000, 'El mensaje no puede exceder 1000 caracteres')
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
