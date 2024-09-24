import { delay, http, HttpResponse } from "msw";
import recommendedTopics from "../data/recomended.json";

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  token: string;
}

const registeredUsers: Array<IUser> = [
  {
    id: "12345678",
    username: "test",
    lastName: "Nodir",
    firstName: "Abdullaev",
    email: "nodir@gmail.com",
    password: "1221",
    token: "77b996b271d3a200faf8db96ae1140e6057f9365941385461c18bc665111ee8d",
  },
];

const topics = recommendedTopics;

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

    // Generate a new token
    const newToken = generateRandomToken();

    // Update user's token in registeredUsers array
    user.token = newToken;

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
      { id, firstName, lastName, email, token: newToken },
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

  // GET ME
  http.get(`${BASE_URL}/users/me`, async ({ request }) => {
    // Extract token from the request headers (assuming Bearer token authentication)
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return HttpResponse.json(
        { message: "Authorization header missing or invalid" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1]; // Extract the token from the header
    await delay();

    // Find the user associated with the token
    const user = registeredUsers.find((user) => user.token === token);

    if (!user) {
      return HttpResponse.json(
        { message: "Invalid token or user not found" },
        { status: 401 }
      );
    }

    // Return user details (omit the password and token)
    const { id, firstName, lastName, email } = user;

    return HttpResponse.json(
      { id, firstName, lastName, email },
      { status: 200 }
    );
  }),

  //RECOMMENDED TOPICS
  http.get(`${BASE_URL}/topics/recommended`, async () => {
    // Simulate delay
    await delay();

    // Return the list of recommended topics
    return HttpResponse.json(topics, { status: 200 });
  }),

  //FOLLOW TO TOPIC
  http.post(`${BASE_URL}/topics/follow`, async ({ request }) => {
    const topicData = await request.json();

    const { topicId } = topicData as { topicId: number };

    // Simulate delay
    await delay();

    // Find the topic by id
    const topic = topics.find((t) => t.id === topicId);

    if (!topic) {
      return HttpResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    // Toggle the 'followed' status
    topic.followed = !topic.followed;

    return HttpResponse.json(
      { message: topic.followed ? "Followed" : "Unfollowed", topic },
      { status: 200 }
    );
  }),
];
