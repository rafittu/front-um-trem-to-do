export default function validateTask(task) {
  if (task.title.length < 3 || task.title.length > 180) {
    throw new Error('O título deve ter entre 3 e 180 caracteres.');
  }

  if (task.description.length < 5 || task.description.length > 700) {
    throw new Error('A descrição deve ter entre 5 e 700 caracteres.');
  }

  if (task.dueDate && new Date() > new Date(task.dueDate)) {
    throw new Error('A data de vencimento da tarefa deve ser posterior à data atual.');
  }
}
