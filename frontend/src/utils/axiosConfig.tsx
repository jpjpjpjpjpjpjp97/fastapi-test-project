import axios from "axios";

const axiosConfig = axios.create(
    {withCredentials: true,}
);

axiosConfig.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosConfig.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await axios.post(
                    `/api/v1/oauth2/refresh/`,
                    {},
                );
                const newAccessToken = response.data.access_token;
                localStorage.setItem("access_token", newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
            } catch (error) {
                // Handle token refresh failure
                // mostly logout the user and re-authenticate by login again
                window.location.replace("/login/");
            }
        }
        return Promise.reject(error);
    },
);

export default axiosConfig;
