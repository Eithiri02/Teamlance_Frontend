export default function getAxiosConfig() {

const user = JSON.parse(localStorage.getItem('user'));
 const config = {
    headers: {
      Authorization: "Bearer " + user?.token,
    },
  };
  return config;
}
