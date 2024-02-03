import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function authenticate(password, res) {
  const is_match = await bcrypt.compare(password, res.Password);
  console.log(is_match);
  if (is_match) {
    const payload = {
      id: res.UserID,
      phonenumber: res.PhoneNumber,
      name : res.Name,
      email : res.Email
    };
    const token = jwt.sign(payload, "KEY");
    return {
      user: payload,
      token: token,
    };
  }
  return null;
}
