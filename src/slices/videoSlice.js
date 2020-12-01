import { toast } from "react-toastify";
import axios from "axios";

export const addUrl = (values, resetForm) => async () => {
  try {
    await axios.post(`/video/adminUpload`, values);
    resetForm();
  } catch (error) {}
};

export const getVideos = (setVideos, setLoading) => async () => {
  try {
    const { data } = await axios.get(`/video/recommendedVideos`);
    setVideos(data);
    setLoading(false);
  } catch (error) {
    toast.error("Errored!", {
      position: "bottom-left",
      hideProgressBar: true,
      autoClose: 5000,
      closeButton: false,
    });
  }
};

export const getSubscriptionVideos = (
  setVideos,
  setSixSubscribedUsers,
  setLoading
) => async () => {
  try {
    const { data } = await axios.get(`/video/getSubscriptionVideos`);
    setSixSubscribedUsers(data.sixSubscribedUsers);
    setVideos(data.videos);
    setLoading(false);
  } catch (error) {
    toast.error("Errored!", {
      position: "bottom-left",
      hideProgressBar: true,
      autoClose: 5000,
      closeButton: false,
    });
  }
};
