import config from "../services/config";

const getUser = async (userId) => {
    try {
        const response = await fetch(`${config.apiPrefix}/get_user?id=${userId}`);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch user data:", error);
        throw error;
    }
};

export default getUser;
