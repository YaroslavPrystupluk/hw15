import domain from "../config/API";
import inMemoryToken from "../service/inMemoryToken";

export const useLogin = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const loginUsers = async () => {
    try {
      const response = await fetch(`${domain}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (response.status === 404) {
        throw new Error("Користувач не зареєстрований");
      }

		 if (response.status === 401) {
       throw new Error("Введіть коректні дані");
     }

      if (!response.ok) {
        throw new Error(`Error Api: status ${response.status}`);
      }
      const { token } = await response.json();
      inMemoryToken.setToken(token);
      localStorage.setItem("token", token);
    } catch (error) {
       throw error;
    }
  };
  return { loginUsers };
};
