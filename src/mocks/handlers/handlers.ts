import { delay, http, HttpResponse } from "msw";

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

const registeredUsers: Array<IUser> = [
  {
    id: "12345678",
    username: "test",
    lastName: "Nodir",
    firstName: "Abdullaev",
    email: "nodir@gmail.com",
    password: "12345678",
  },
];

function generateRandomToken(length = 32) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}

function generateUniqueId() {
  const timestamp = Date.now(); // Get current timestamp
  const randomNum = Math.floor(Math.random() * 1000000); // Generate a random number
  return `${timestamp}-${randomNum}`; // Combine them to create a unique ID
}

const BASE_URL = "https://medium-api.com";

export const handlers = [
  // LOGIN
  http.post(`${BASE_URL}/users/login`, async ({ request }) => {
    const requestBody = await request.json();

    await delay();

    const { username, password } = requestBody as IUser;

    // Find the user by username
    const user = registeredUsers.find((user) => user.username === username);

    if (!user) {
      return HttpResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if the password matches
    if (user.password !== password) {
      return HttpResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Return user details (omit the password)
    const { id, firstName, lastName, email } = user;

    return HttpResponse.json(
      { id, firstName, lastName, email, token: generateRandomToken() },
      { status: 200 }
    );
  }),

  // REGISTER
  http.post(`${BASE_URL}/users/register`, async ({ request }) => {
    const requestBody = await request.json();

    await delay();

    const { username, password, firstName, lastName, email } =
      requestBody as IUser;

    // Check if the username already exists
    const existingUser = registeredUsers.find(
      (user) => user.username === username
    );
    if (existingUser) {
      return HttpResponse.json(
        { message: "Username already taken" },
        { status: 409 }
      );
    }

    // Create a new user object
    const newUser = {
      id: generateUniqueId(), // Implement a function to generate a unique ID
      username,
      password, // Consider hashing the password for security
      firstName,
      lastName,
      email,
      token: generateRandomToken(),
    };

    // Add the new user to the registered users list
    registeredUsers.push(newUser);

    // Return user details (omit the password) and a token
    const { id, firstName: userFirstName, lastName: userLastName } = newUser;

    return HttpResponse.json(
      {
        id,
        firstName: userFirstName,
        lastName: userLastName,
        email,
        token: generateRandomToken(),
      },
      { status: 201 }
    );
  }),
];
