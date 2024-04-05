
const useLogout = (): (() => void) => {
  const logout = (): void => {
    localStorage.removeItem("token");
  };

  return logout;
};

export { useLogout };
