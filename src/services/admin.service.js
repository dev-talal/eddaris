import axios from "./axios";

const login = (email, password) => {
  return axios.post("/auth/sign-in", {
    email,
    password,
  });
};
const getUsers = () => {
  return axios.get("/admin/all-users");
};
const getDownloads = () => {
  return axios.get("/admin/download-counts");
};
const getFaqs = () => {
  return axios.get("/faq");
};
const register = (name, email, password, user_type) => {
  return axios.post("/auth/sign-up", {
    name,
    email,
    password,
    user_type,
  });
};
const AddFaqs = (question, answer) => {
  return axios.post("/faq/create", {
    question,
    answer,
  });
};
const deleteFaq = (faqId) => {
  return axios.delete("/faq/" + faqId);
};
const editFaqs = (question, answer, id) => {
  return axios.put("/faq/" + id, {
    question,
    answer,
  });
};
const userUpdate = (name, location, phone_no, userId) => {
  return axios.put("/admin/update-profile/" + userId, {
    name,
    location,
    phone_no,
  });
};
const deleteUser = (userId) => {
  return axios.delete("/admin/delete-user/" + userId);
};
const userStatus = (userId, status) => {
  return axios.put("/admin/update-user-status", {
    userId,
    status,
  });
};
const sendVerification = (email) => {
  return axios.post("/auth/forgot-password-email-link", {
    email,
  });
};
const changePassword = (userId,password,confirmPassword,) => {
  return axios.post(`/auth/password-reset-api?user=${userId}`, {
    password,confirmPassword
  });
};
const getQrResponse = (url) => {
  const header = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  return axios.get(url, {
    header,
  });
};
const sendQrResponse = (QRCodeId, name, message) => {
  return axios.post("/qr-code/post-comment", {
    QRCodeId,
    name,
    message,
  });
};
const downloadEmptyQr = (number,template_name,arrayAmount) => {
  return axios.post(
    "/qr-code/generate-empty-qr-code",
    {
      number,template_name,arrayAmount
    },
    { timeout: number * 3000 }
  );
};
const downloadByRange = (start, end) => {
  return axios.post("/admin/download-counts-by-range", {
    start,
    end,
  });
};
const updateProfile = (name, password) => {
  return axios.put("/auth/update-profile", {
    name,
    password,
  });
};

export default {
  login,
  getUsers,
  AddFaqs,
  editFaqs,
  getFaqs,
  deleteFaq,
  userStatus,
  register,
  userUpdate,
  deleteUser,
  getQrResponse,
  sendQrResponse,
  getDownloads,
  downloadEmptyQr,
  downloadByRange,
  updateProfile,
  sendVerification,
  changePassword
};
