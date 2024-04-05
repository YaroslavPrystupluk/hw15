import { InMemoryService } from "../interface/item";

 const inMemoryService = (): InMemoryService => {
	let inMemoryToken: string | null = null;

	const getToken = (): string | null => {
		return inMemoryToken;
	}

	const setToken = (token: string): void => {
		inMemoryToken = token;
	}

	const deleteToken = (): void => {
		inMemoryToken = null;
	}

	return { getToken, setToken, deleteToken }
}

export default inMemoryService();