import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { setCookie } from "cookies-next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const errors: string[] = [];
    const { email, password } = req.body;
    console.log(req.body);

    let response;

    try {
      response = await axios.post(`${process.env.BASE_URL}/login/admin`, {
        email,
        password,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
    }

    if (!response) {
      return res
        .status(401)
        .json({ errorMessage: "Email or password is incorrect" });
    }
    const user = response.data;
    console.log(user);

    const alg = "HS256";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({
      email: user.email,
    })
      .setProtectedHeader({ alg })
      .setExpirationTime("24h")
      .sign(secret);
    setCookie("jwt", token, { req, res, maxAge: 60 * 6 * 24 });

    console.log("Sign in......");
    return res.status(200);
    // return res.status(200).json({
    //   firstName: user.first_name,
    //   lastName: user.last_name,
    //   email: user.email,
    //   phone: user.phone,
    //   city: user.city,
    // });
  }

  return res.status(404).json("Unknown endpoint");
}
