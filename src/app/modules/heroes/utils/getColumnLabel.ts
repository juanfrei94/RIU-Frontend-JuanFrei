export const getColumnLabel = (column: string): string => {
  const labels: Record<string, string> = {
    superhero: 'Superhéroe',
    publisher: 'Editorial',
    alter_ego: 'Alter Ego',
    first_appearance: 'Primera Aparición',
    characters: 'Personajes',
  };
  return labels[column] ?? column;
};
