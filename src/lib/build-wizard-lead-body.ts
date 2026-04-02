/*
 * Wizard → Web3Forms email body (plain text passed as the `message` field).
 *
 * Product requirement:
 *   whatsapp (E.164)
 *   blank line
 *   questionnaire answers (formattedQa)
 *   blank line
 *   company name
 *
 * Other fields (appointmentDetail, pathId) remain on the payload for the API
 * if we extend the template later; currently only the three blocks above go
 * into `message` via buildWizardLeadEmailBody().
 */
export type WizardLeadPayload = {
  contactName: string;
  email: string;
  whatsapp: string;
  company: string;
  appointmentDetail: string;
  pathId: string;
  formattedQa: string;
};

export function buildWizardLeadEmailBody(p: WizardLeadPayload): string {
  return [p.whatsapp, p.formattedQa, p.company].filter(Boolean).join("\n\n");
}
