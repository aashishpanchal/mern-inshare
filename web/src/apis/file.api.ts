import { api } from "@/axios/instance";
import { toast } from "react-hot-toast";
import { AxiosError, AxiosRequestConfig } from "axios";

class FileApi {
  async upload(file: File, config?: AxiosRequestConfig<FormData>) {
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await api.post("/file/upload", form, config);
      toast.success("Successfully upload!");
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { response } = error;
        toast.error(response?.data?.message);
      }
    }
  }

  async getFile(id: string) {
    try {
      return await api.get(`/file/${id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        const { response } = error;
        toast.error(response?.data?.message);
      }
      throw error;
    }
  }

  async download(id: string) {
    try {
      return await api.get(`/file/download/${id}`, {
        responseType: "blob",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        const { response } = error;
        toast.error(response?.data?.message);
      }
    }
  }

  async sendFileOnMail(id: string, to: string) {
    try {
      return await api.post(`/file/send`, { id, to });
    } catch (error) {
      if (error instanceof AxiosError) {
        const { response } = error;
        toast.error(response?.data?.message);
      }
    }
  }
}

export const fileApi = new FileApi();
