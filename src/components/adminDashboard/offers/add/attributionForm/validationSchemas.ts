// validationSchemas.ts
import { z } from "zod";

export const attributionFormSchema = z.object({
  attributionMethod: z.string().min(1, "Attribution Method is required"),
  applyThrottleRate: z.boolean(),
  conversionStatus: z.boolean(),
  conversionTime: z.boolean(),
  minConversionTime: z.string().optional(),
  minTimeInterval: z.string().optional(),
  maxConversionTime: z.string().optional(),
  maxTimeInterval: z.string().optional(),
  enableMaxEmail: z.boolean(),
  emailAttributionMethod: z.string(),
  maxEmailAttributionWindowType: z.string(),
  maxEmailAttributionWindow: z.string(),
  maxSessionLifespan: z.number().optional(),
  minSessionLifespan: z.number().optional(),
  throttleRate: z.number().optional(),
  customEmailAttributionWindow: z.number().optional(),
  enableViewThrough: z.boolean(),
  maxLookbackWindow: z.boolean(),
  minLookbackWindow: z.boolean(),
  enableViewThroughLookbackWindow: z.boolean(),
  enableServerSideClick: z.boolean(),
  viewThroughDestinationURL: z.string().optional(),
}).refine(
  (data) => !(data.enableViewThrough && !data.viewThroughDestinationURL),
  {
    message: "View Through URL is required when View-Through is enabled",
    path: ["viewThroughDestinationURL"],
  }
);

export type AttributionFormData = z.infer<typeof attributionFormSchema>;