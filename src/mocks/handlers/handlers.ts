import { http, HttpResponse } from "msw";
import recommendedTopics from "../data/recomended.json";

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  info: string;
  bio: string;
  image: string;
  password: string;
  token: string;
}

export const registeredUsers: Array<IUser> = [
  {
    id: "12345678",
    username: "test",
    lastName: "Nodir",
    firstName: "Abdullaev",
    info: "Front-end Software engineer",
    email: "nodir@gmail.com",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, soluta!",
    password: "1221",
    token: "6bbabdd7fcf02c172fcd88fdaec3328654b12c1fbfbc7406f6c6ec92ac5e7be2",
    image: "",
  },
];

const BASE_URL = "https://medium-api.com";
const topics = recommendedTopics;

const generateRandomToken = (length = 32) =>
  Array.from(window.crypto.getRandomValues(new Uint8Array(length)), (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");

const generateUniqueId = () =>
  `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;

const getAuthToken = (authHeader: string | null) =>
  authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

const findUserByUsername = (username: string) =>
  registeredUsers.find((user) => user.username === username);

const findUserByToken = (token: string) =>
  registeredUsers.find((user) => user.token === token);

const updateUserToken = (user: IUser, newToken: string) => {
  user.token = newToken;
};

export const handlers = [
  // LOGIN
  http.post(`${BASE_URL}/users/login`, async ({ request }) => {
    const { username, password } = (await request.json()) as IUser;
    const user = findUserByUsername(username);

    if (!user) {
      return HttpResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.password !== password) {
      return HttpResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const newToken = generateRandomToken();
    updateUserToken(user, newToken);
    const { id, firstName, lastName, email } = user;

    return HttpResponse.json(
      { id, firstName, lastName, email, token: newToken },
      { status: 200 }
    );
  }),

  // REGISTER
  http.post(`${BASE_URL}/users/register`, async ({ request }) => {
    const { username, password, info, bio, firstName, lastName, email } =
      (await request.json()) as IUser;

    if (findUserByUsername(username)) {
      return HttpResponse.json(
        { message: "Username already taken" },
        { status: 409 }
      );
    }

    const newUser: IUser = {
      id: generateUniqueId(),
      username,
      password,
      firstName,
      lastName,
      info,
      bio,
      email,
      image: "",
      token: generateRandomToken(),
    };

    registeredUsers.push(newUser);

    return HttpResponse.json(
      {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email,
        token: newUser.token,
      },
      { status: 201 }
    );
  }),

  // GET ME
  http.get(`${BASE_URL}/users/me`, async ({ request }) => {
    const token = getAuthToken(request.headers.get("Authorization"));
    const user = token && findUserByToken(token);

    if (!user) {
      return HttpResponse.json(
        { message: "Invalid token or user not found" },
        { status: 401 }
      );
    }

    const { id, firstName, lastName, email, info, bio, image } = user;
    return HttpResponse.json(
      { id, firstName, lastName, email, info, bio, image },
      { status: 200 }
    );
  }),

  // RECOMMENDED TOPICS
  http.get(`${BASE_URL}/topics/recommended`, () =>
    HttpResponse.json(topics, { status: 200 })
  ),

  // FOLLOW TO TOPIC
  http.post(`${BASE_URL}/topics/follow`, async ({ request }) => {
    const { topicId } = (await request.json()) as { topicId: number };
    const topic = topics.find((t) => t.id === topicId);

    if (!topic) {
      return HttpResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    topic.followed = !topic.followed;
    return HttpResponse.json(
      { message: topic.followed ? "Followed" : "Unfollowed", topic },
      { status: 200 }
    );
  }),

  // UPDATE USER INFO
  http.patch(`${BASE_URL}/users/update`, async ({ request }) => {
    const token = getAuthToken(request.headers.get("Authorization"));
    const user = token && findUserByToken(token);

    if (!user) {
      return HttpResponse.json(
        { message: "Invalid token or user not found" },
        { status: 401 }
      );
    }

    const { info, bio, firstName, image } =
      (await request.json()) as Partial<IUser>;
    Object.assign(user, { info, bio, firstName, image });

    return HttpResponse.json(
      {
        message: "User information updated successfully",
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          info: user.info,
          bio: user.bio,
        },
      },
      { status: 200 }
    );
  }),
];
