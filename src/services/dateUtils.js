export const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
export const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

export const getDaysInMonth = (month, year) => {
  const date = new Date(year, month, 1);
  const days = [];

  while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
  }
  
  return days;
};
