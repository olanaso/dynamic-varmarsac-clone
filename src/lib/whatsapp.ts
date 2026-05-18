const WHATSAPP_PHONE = "51950396818";
const MAX_WHATSAPP_MESSAGE_LENGTH = 1800;

export const openWhatsApp = (message: string) => {
  const safeMessage = message.trim().slice(0, MAX_WHATSAPP_MESSAGE_LENGTH);
  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(safeMessage)}`;
  const opened = window.open(url, "_blank");

  if (!opened) {
    window.location.href = url;
  }
};

export const whatsappContactMessage =
  "Hola, quiero solicitar información sobre los servicios de VARMAR Contratistas Generales.";