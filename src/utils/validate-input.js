export function validateTaskInput(title, description) {
  const errors = [];

  if (!title || typeof title !== "string" || title.trim() === "") {
    errors.push({
      message: "O título é obrigatório e deve ser uma string válida",
    });
  } else if (title.length > 100) {
    errors.push({ message: "O título não pode exceder 100 caracteres" });
  }

  if (
    !description ||
    typeof description !== "string" ||
    description.trim() === ""
  ) {
    errors.push({
      message: "A descrição é obrigatória e deve ser uma string válida",
    });
  } else if (description.length > 500) {
    errors.push({ message: "A descrição não pode exceder 500 caracteres" });
  }

  return errors;
}
