const { thinky } = require("../config/thinky");
const type = thinky.type;
const r = thinky.r;

const userSchema = thinky.createModel("user", {
  fName: type.string().min(3).required(),
  lName: type.string().min(1).required(),
  fullName: type.string().default(function () {
    return `${this.fName} ${this.lName}`;
  }),
  role: type
    .string()
    .enum(["admin", "sponsor", "doctor", "consultant"])
    .default("admin"),
  email: type.string().email().required(),
  password: type.string().min(6).required(),
  createdBy: type.string(),
  createdAt: type.date().default(r.now()),
});

module.exports = userSchema;
