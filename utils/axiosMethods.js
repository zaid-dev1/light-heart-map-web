import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (
      error?.response &&
      error?.response?.data?.statusCode === 401 &&
      !error?.response?.data?.path?.includes("login")
    ) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
        localStorage.removeItem("token");
      }
      // Redirect to /login when a 401 error occurs
    }
    return Promise.reject(error);
  },
);

export const axiosGet = async ({ path }) => {
  try {
    const res = await instance.get(path);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const axiosPost = async ({ path, payload }) => {
  try {
    const res = await instance.post(path, payload);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const axiosPatch = async ({ path, payload }) => {
  try {
    const res = await instance.patch(path, payload);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const axiosPut = async ({ path, payload }) => {
  try {
    const res = await instance.put(path, payload);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const axiosDelete = async ({ path }) => {
  try {
    const res = await instance.delete(path);
    return res;
  } catch (err) {
    console.log(err);
  }
};
