export interface IItem {
  id: string;
  title: string;
  text: string;
  createDate: string;
  author: IUser;
}

export interface IUser {
  id: string;
  email: string;
  password: string;
}

export interface BtnProps {
  buttonText: string;
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  variant?: "text" | "outlined" | "contained";
  onClick?: (() => void);
}

export interface ISnackBar {
	snackbarText: string,
	severity: "error" | "success",
	btnName: string,
	onClick?: (() => void)
}

export interface IState {
  newsposts: IItem[];
  loading: boolean;
  error: string | null;
}

export interface OneNewspostsState {
  oneNewsposts: IItem | null;
  loading: boolean;
  error: string | null;
}

export interface InMemoryService {
  getToken: () => string | null;
  setToken: (token: string) => void;
  deleteToken: () => void;
}