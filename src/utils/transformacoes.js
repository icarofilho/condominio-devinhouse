module.exports = {
  dateFormat(date) {
    const newDate = date.split(" ")[0].split("-");
    const newDateFormatted = newDate[2] + "-" + newDate[1] + "-" + newDate[0];
    return newDateFormatted;
  },
  removeAccents(str) {
    const accents = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
    const noAccents = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
      let change = false;
      for (let a = 0; a < accents.length; a++) {
        if (str.substr(i, 1) == accents.substr(a, 1)) {
          newStr += noAccents.substr(a, 1);
          change = true;
          break;
        }
      }
      if (change == false) {
        newStr += str.substr(i, 1);
      }
    }
    return newStr;
  },
};
