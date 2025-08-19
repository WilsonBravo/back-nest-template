export const FORM_ERR_MESSAGE = {
  REQUIRED: 'Este campo es requerido',
  VALID: 'Ingrese un valor válido',
  IS_INT: 'Debe ser un número entero',
  OTHER: "Debe especificar cuando selecciona 'Otro'",
  ONE_WORD: 'Solo puede contener letras y no debe tener espacios',
  min: (value: number) => `Debe ser mayor a ${value} caracteres` as const,
  max: (value: number) => `No puede exceder ${value} caracteres` as const,
  minNumberDigit: (value: number) =>
    `Debe tener más de ${value} digitos` as const,
  maxNumberDigit: (value: number) =>
    `No puede tener más de ${value} digitos` as const,
  minNumber: (value: number) => `Debe ser mayor a ${value - 1}` as const,
  maxNumber: (value: number) => `Debe ser menor a ${value + 1}` as const,
  maxFiles: (value: number) => `Solo se permiten ${value} archivos` as const,
  patternAllowed: (allowed: string) => `Solo se permiten ${allowed}` as const,
  patternAtLeast: (allowed: string) =>
    `Debe contener al menos ${allowed}` as const,
  patternNotAllowed: (notAllowed: string) =>
    `No se permiten ${notAllowed}` as const,

  formatAllowed: (allowed: string) =>
    `Solo se permiten formatos ${allowed}` as const,
  maxSize: (allowed: string) =>
    `El tamaño del archivo no puede ser mayor a ${allowed}MB` as const,
} as const;
