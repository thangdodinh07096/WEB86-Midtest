import crypto from "crypto";
import UserModel from "../models/User.js";

export function generateRandomString(length){
    return crypto.randomBytes(length).toString("hex");
}