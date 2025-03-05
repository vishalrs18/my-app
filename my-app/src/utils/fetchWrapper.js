export const fetchApi = ({ url, method, body, csrf = false, isProtected = false }) => {
  const apiURL = import.meta.env.VITE_BASE_URL + url;

  const fetchParams = {
    method: method || "GET",
    headers: {
      "Content-Type": "application/json",
    },
    ...(body && {
      body: JSON.stringify(body),
    }),
  };

  if(csrf) {
    fetchParams.headers = {
      ...fetchParams.headers,
      'X-CSRF-Token': csrf,
    }
  }

  if(isProtected) {
    fetchParams.headers = {
      ...fetchParams.headers,
      "access_token": localStorage.getItem('access_token')
    }
  }

  return fetch(apiURL, fetchParams)
    .then((res1) => res1.json())
    .then((res) => {
      return res;
    });
};
