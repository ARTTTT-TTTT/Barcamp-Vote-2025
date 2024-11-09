import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

import getUser from "./api/user.js";
import getConsole from "./api/console.js";
import config from "./services/config";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter(
    [
        {
            path: "/",
            loader: () => {
                window.location.href = `${config.registerDomain}`;
                return null;
            },
        },
        {
            path: "/:id",
            element: <App />,
            loader: async ({ params }) => {
                const { id } = params;

                try {
                    const Console = await getConsole();
                    const user = await getUser(id);

                    if (Console.vote !== true || user.status !== "CONFIRMED") {
                        window.location.href = `${config.registerDomain}`;
                        return null;
                    }

                    return { id, Console };
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    window.location.href = `${config.registerDomain}`;
                    return null;
                }
            },
        },
    ],
    { basename: "/vote" }
);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

reportWebVitals();
