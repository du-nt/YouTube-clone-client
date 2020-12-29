import axios from "axios";
import { toast } from "react-toastify";

export const upload = async (
  file,
  subtitles,
  source,
  CloseButton,
  resetSubmitted
) => {
  axios.defaults.withCredentials = false;
  const url = process.env.CLOUD_URL;
  let toastId = null;
  const myNewToastId = "progress";

  const formData2 = new FormData();
  formData2.append("file", file);
  formData2.append("upload_preset", "video_youtube");
  formData2.append("folder", "uploadedVideos");

  const config = {
    onUploadProgress: (p) => {
      const progress = p.loaded / p.total;
      const percent = Math.ceil(progress * 100);

      if (toastId === null) {
        toastId = toast.info("Upload in progress", {
          progress,
          hideProgressBar: false,
          closeButton: CloseButton,
          className: "center",
          toastId: myNewToastId,
        });
      } else {
        progress === 1
          ? toast.update(myNewToastId, {
              render: "Finishing, please wait...",
              progress: undefined,
              autoClose: false,
              closeButton: false,
            })
          : toast.update(myNewToastId, {
              render: `Upload in progress ${percent}%`,
              progress,
            });
      }
    },
    cancelToken: source.token,
  };

  if (subtitles.length) {
    const formData1 = new FormData();
    formData1.append("file", subtitles[0]);
    formData1.append("upload_preset", "video_youtube");
    formData1.append("folder", "caption");
    formData1.append("resource_type", "raw");

    const upload1 = axios
      .post(url, formData1)
      .then(({ data }) => {
        toast.success("Subtitle uploaded !", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        return data.secure_url;
      })
      .catch((err) => {
        resetSubmitted();
      });

    const upload2 = axios
      .post(url, formData2, config)
      .then(({ data }) => data.secure_url)
      .catch((err) => {
        toast.update(myNewToastId, {
          render: err.message,
          type: toast.TYPE.ERROR,
          hideProgressBar: true,
          autoClose: 1500,
          closeButton: false,
          progress: undefined,
          className: "center",
        });
        resetSubmitted();
      });

    return Promise.all([upload2, upload1]);
  } else {
    return axios
      .post(url, formData2, config)
      .then(({ data }) => [data.secure_url])
      .catch((err) => {
        toast.update(myNewToastId, {
          render: err.message,
          type: toast.TYPE.ERROR,
          hideProgressBar: true,
          autoClose: 1500,
          closeButton: false,
          progress: undefined,
          className: "center",
        });
        resetSubmitted();
      });
  }
};
