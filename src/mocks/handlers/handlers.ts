/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from "msw";
import crypto from "crypto";

const registeredUsers: Array<{
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}> = [];

const BASE_URL = "https://api-medium.com/v1/";

export const handlers = [
  http.post(`${BASE_URL}/register`, (req: any) => {
    const { firstName, lastName, username, email, password } = req.body;
    const newUser = {
      id: crypto.randomUUID(),
      firstName,
      lastName,
      username,
      email,
      password,
    };
    registeredUsers.push(newUser);
    return HttpResponse.json(newUser, { status: 201 });
  }),

  http.post(`${BASE_URL}/login`, (req: any) => {
    const { username, password } = req.body;
    const user = registeredUsers.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      return HttpResponse.json({ message: "Login successful", user });
    }
    return HttpResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }),
];
