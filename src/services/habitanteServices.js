class HabitanteService {
  getAge(date) {
    const newDate = date.split(" ")[0].split("-");
    const [year, month, day] = newDate;
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  }
}
module.exports = new HabitanteService();
