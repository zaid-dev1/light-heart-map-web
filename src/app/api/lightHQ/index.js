import {
  axiosGet,
  axiosPut,
  axiosPost,
  axiosDelete,
} from "../../../../utils/axiosMethods";

export const getAllLightHQ = async () => {
  const res = await axiosGet({
    path: `headquarters`,
  });

  return res;
};

export const getLightHQById = async (id) => {
  const res = await axiosGet({
    path: `headquarters/${id}`,
  });

  return res;
};

export const createLightHQ = async (payload) => {
  const res = await axiosPost({
    path: `headquarters`,
    payload,
  });

  return res;
};

export const updateLightHQById = async (payload, id) => {
  const res = await axiosPut({
    path: `headquarters/${id}`,
    payload,
  });

  return res;
};

export const deleteLightHQ = async (id) => {
  const res = await axiosDelete({
    path: `headquarters/${id}`,
  });

  return res;
};
