const USER_KEY = 'user';

export const setUser = (user) => {
  localStorage.setItem(USER_KEY, user);
};

export const deleteUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const getUser = () => localStorage.getItem(USER_KEY);

export const isUserAuth = () => localStorage.getItem(USER_KEY) !== null;
