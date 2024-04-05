import domain from "../config/API";
import inMemory from "../service/inMemoryToken";

export const useAddNewUser = ({
  email,
  password,
  confirmPassword,

}: {
  email: string;
  password: string;
  confirmPassword: string;

}) => {

  const addNewUsers = async () => {
    try {
      const response = await fetch(`${domain}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          confirmPassword,
        }),
      });
	
      if (response.status === 400) {
        throw new Error("Користувач вже зареєстрований");
      }

		
      if (!response.ok) {
        throw new Error(`Error Api: status ${response.status}`);
      }

		const {token} = await response.json();
		inMemory.setToken(token);
	
    } catch (error) {
      throw error;
    }
  };
  return { addNewUsers };
};