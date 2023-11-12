const result = (r) => {
  let rs = {
    O: 10,
    E: 9,
    A: 8,
    B: 7,
    C: 6,
    D: 5,
    F: "FAIL",
    M: "MP",
    S: "FAIL",
  };

  let cal = 0;
  for (let i = 0; i < r.length; i++) {
    if (r[i]["Grade"] == "F" || r[i]["Grade"] == "S") {
      return "FAIL";
    } else if (r[i]["Grade"] == "M") {
      return "MP";
    }
    cal += rs[r[i]["Grade"]];
  }
  return cal / r.length;
};
module.exports = { result };
