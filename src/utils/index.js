import axios from "axios";
import { toast } from "react-toastify";

export const upload = async (files) => {
  if (files.length) {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("file", file);
      formData.append("api_key", "814524645536838");
      formData.append("api_secret", "nvYpUt8OPojkyecE6haWHoJ3tvs");
      formData.append("upload_preset", "ml_default");
      formData.append("timestamp", (Date.now() / 1000) | 0);
    });
    const url = "https://api.cloudinary.com/v1_1/dwtbzg7gs/upload";

    const toastId = null;
    const config = {
      onUploadProgress: (p) => {
        const progress = p.loaded / p.total;
        if (toastId === null) {
          toastId = toast("Upload in Progress", {
            progress,
          });
        } else {
          toast.update(toastId, {
            progress,
          });
        }
      },
    };

    // axios
    //   .post(url, formData, config2)

    fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "content-type": "multipart/form-data",
      },
      body: formData,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
};
