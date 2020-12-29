import axios from "axios";

export const getVideos = (setLoading, setVideos) => async () => {
  try {
    const { data } = await axios.get("/admin/getVideos");
    setVideos(data);
    setLoading(false);
  } catch (error) {}
};

export const getUsers = (setLoading, setUsers) => async () => {
  try {
    const { data } = await axios.get("/admin/getUsers");
    setUsers(data);
    setLoading(false);
  } catch (error) {}
};

export const deleteUser = (_id, setUsers) => async () => {
  try {
    await axios.get(`/admin/deleteUser/${_id}`);
    setUsers((prev) => prev.filter((user) => user._id !== _id));
  } catch (error) {}
};

export const deleteVideo = (_id, setVideos) => async () => {
  try {
    await axios.get(`/admin/deleteVideo/${_id}`);
    setVideos((prev) => prev.filter((video) => video._id !== _id));
  } catch (error) {}
};
