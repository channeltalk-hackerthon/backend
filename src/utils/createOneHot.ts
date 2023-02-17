const createOneHot = (oneIdx: Number, length: Number) => {
  let oneHot = [];

  for (let i = 0; i < length; i++) {
    if (i == oneIdx) {
      oneHot.push(1);
    } else {
      oneHot.push(0);
    }
  }
};

export default createOneHot;
