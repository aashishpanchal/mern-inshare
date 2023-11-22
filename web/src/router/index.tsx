import Home from "../pages/home";
import Layout from "@/components/layout";
import DownloadFile from "@/pages/download-file";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: ":uid", element: <DownloadFile /> },
    ],
  },
]);
