import React from "react";
import CryptoJS from "crypto-js";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

import getUser from "./api/user.js";
import getConsole from "./api/console.js";
import config from "./services/config.js";

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
                let { id } = params;

                try {
                    const bytes = CryptoJS.AES.decrypt(id, config.secretKey);
                    const decryptedId = bytes.toString(CryptoJS.enc.Utf8);

                    if (!decryptedId) {
                        console.error("Decryption failed: Invalid ID.");
                        window.location.href = `${config.registerDomain}/profile`;
                        return null;
                    }

                    const Console = await getConsole();
                    const user = await getUser(decryptedId);

                    if (Console.vote !== true || user.status !== "CONFIRMED") {
                        console.error("User is not eligible for voting.");
                        window.location.href = `${config.registerDomain}/profile`;
                        return null;
                    }

                    return { id: decryptedId, Console };
                } catch (error) {
                    console.error("Error fetching or decrypting user data:", error);
                    window.location.href = `${config.registerDomain}/profile`;
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
