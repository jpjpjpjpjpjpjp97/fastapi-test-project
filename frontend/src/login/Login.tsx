import { useState, useEffect, FormEvent } from "react";
import { AxiosResponse } from "axios";
import "../styles/app.css";
import axiosConfig from "../utils/axiosConfig";

// const hostname: string = "http://127.0.0.1:8000";

type LoginFormState = {
    username: string;
    password: string;
};

const submitLogin = async (
    event: FormEvent<HTMLFormElement>,
    loginFormData: LoginFormState,
) => {
    event.preventDefault();
    try {
        const response: AxiosResponse = await axiosConfig.post(
            `/api/v1/oauth2/token/`,
            loginFormData,
            {
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },
            },
        );
        response.status
        window.location.replace("/");
    } catch (error) {
        console.log(error);
    }
};

function Login() {
    const initialLoginForm = {
        username: "",
        password: "",
    };
    const [loginForm, setLoginForm] =
        useState<LoginFormState>(initialLoginForm);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    useEffect(() => {}, []);

    return (
        <div>
            <form onSubmit={(event) => submitLogin(event, loginForm)}>
                <div>
                    <label htmlFor="login_username">Username </label>
                    <input
                        id="login_username"
                        name="login_username"
                        type="text"
                        value={loginForm.username}
                        onChange={(event) =>
                            setLoginForm((previousLoginForm) => ({
                                ...previousLoginForm,
                                username: event.target.value,
                            }))
                        }
                    />
                </div>
                <div>
                    <label htmlFor="login_password">Password </label>
                    <input
                        id="login_password"
                        name="login_password"
                        type={!showPassword ? "password" : "text"}
                        value={loginForm.password}
                        onChange={(event) =>
                            setLoginForm((previousLoginForm) => ({
                                ...previousLoginForm,
                                password: event.target.value,
                            }))
                        }
                    />
                    Show{" "}
                    <input
                        type="checkbox"
                        onChange={() => setShowPassword(!showPassword)}
                        checked={showPassword}
                    />
                </div>
                <input type="submit" value="Login" />
            </form>
        </div>
    );
}

export default Login;
