export type ContactForm = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  topic: string;
  description: string;
  message: string;
};

export type ContactFormPayload = Omit<ContactForm, "id">;

export type ContactFormResponse = {
  data: ContactForm[];
};
