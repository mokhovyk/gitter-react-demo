const defaultOptions = {
  method: 'get',
  credentials: 'include',
};

export default (url, options = defaultOptions) => {
  return fetch(url, {
      ...options,
    })
    .then((response) => {
      return response.json();
    })
}


