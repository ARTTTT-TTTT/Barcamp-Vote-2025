import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

import getUser from "./api/user.js";
import getConsole from "./api/console.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
    {
        path: "/vote/:id",
        element: <App />,
        loader: async ({ params }) => {
            const { id } = params;

            // Pass user ID to getUser
            const user = await getUser(id);
            const Console = await getConsole();

            // Check user session and Console.vote status
            if (user.message === "No session.") {
                return (window.location.href = "/register");
            }
            if (Console.vote !== true && user.status !== "CONFIRMED") {
                return (window.location.href = "/register/profile");
            }

            return { user, Console, id };
        },
    },
]);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
