import RoutesMain from "./RoutesMain";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../src/style.scss";
import "../src/style2.scss";
import "../node_modules/toastr/build/toastr.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App(params) {
  return (
    <>
      <ToastContainer autoClose={1000} />
      <RoutesMain />
    </>
  );
}
