import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";
import getUser from "./api/getUser";
import getConsole from "./api/getConsole";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const check_session = (user) => {
    if (user.message === "No session.") {
        window.location.href = "/";
    }
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter(
    [
        {
            path: "/vote/:id", // Dynamic route parameter
            element: <App />,
            loader: async ({ params }) => { // Change api to loader to use params
                const user = await getUser();
                const Console = await getConsole();
                const { id } = params; // Access the id parameter

                const redirectResult = check_session(user);
                if (redirectResult) {
                    return redirectResult;
                }

                return { user, Console, id };
            },
        },
    ]
);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
        
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
