export const logout = async () => {
  try {
    await axios.delete(urlUser + "/logout");
  } catch (e) {
    console.error(e);
  }
};
