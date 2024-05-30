const randomstring = require("randomstring");

const generateOTP = () => {
  return randomstring.generate({
    length: 4,
    charset: "numeric",
  });
};

module.exports = generateOTP;
