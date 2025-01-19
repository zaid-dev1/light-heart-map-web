import {
  axiosGet,
  axiosPatch,
  axiosPost,
} from "../../../../utils/axiosMethods";

export const getNearByUsers = async (payload) => {
  const res = await axiosPost({
    path: "customers/nearby",
    payload,
  });

  return res;
};

export const loginUser = async (payload) => {
  const res = await axiosPost({
    path: `customers/login`,
    payload,
  });

  return res;
};

export const forgetPassword = async (payload) => {
  const res = await axiosPost({
    path: `customers/forgot-password`,
    payload,
  });

  return res;
};

export const resetPassword = async (payload) => {
  const res = await axiosPost({
    path: `customers/reset-password`,
    payload,
  });

  return res;
};

export const getCustomerById = async (customerId) => {
  const res = await axiosGet({
    path: `customers/protected/${customerId}`,
  });

  return res;
};

export const updateBusinessDetails = async (payload, customerId) => {
  const res = await axiosPost({
    path: `business-details/protected/${customerId}`,
    payload,
  });

  return res;
};

export const getAllCustomers = async (page, limit) => {
  const res = await axiosGet({
    path: `customers/protected/admin/all?page=${page}&limit=${limit}`,
  });

  return res;
};

export const updateUserRole = async (customerId, payload) => {
  const res = await axiosPatch({
    path: `customers/protected/${customerId}/role`,
    payload,
  });

  return res;
};
