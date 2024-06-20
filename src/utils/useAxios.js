import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useContext, useMemo } from "react";
import AuthContext from "../context/AuthContext";
import config from "../config";
const swal = require('sweetalert2');

const baseURL = `${config.API_BASE_URL}`;

const useAxios = () => {
 const { authTokens, setUser, setAuthTokens, logoutUser } = useContext(AuthContext);

 const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL,
      headers: { Authorization: `JWT ${authTokens?.access}` }
    });

    instance.interceptors.request.use(async req => {
      const user = jwtDecode(authTokens.access);
      const isExpired = dayjs().isAfter(dayjs.unix(user.exp));

      if (!isExpired) return req;

      try {
        const response = await axios.post(`${baseURL}/jwt/refresh/`, {
          'refresh': `${authTokens.refresh}`
        });
        localStorage.setItem("authTokens", JSON.stringify(response.data));

        setAuthTokens(response.data);
        setUser(jwtDecode(response.data.access));

        req.headers.Authorization = `JWT ${response.data.access}`;
        return req;
      } catch (error) {
        logoutUser();
        if (error.response && (error.response.status === 401 || error.response.data.message === 'Refresh token expired')) {
          swal.fire({
            title: "Your Session Ended. Please Login",
            icon: "success",
            toast: true,
            timer: 6000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
          })
        } else {
          swal.fire({
            title : "Something Went Wrong",
            text: "Server Didn't Respond Properly. Please try again after some time.",
            icon: "error",
            toast: true,
            timer: 6000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
          })
        }
        throw error;
      }
    });

    return instance;
 }, [authTokens, setUser, setAuthTokens, logoutUser]);

 return axiosInstance;
};

export default useAxios;
