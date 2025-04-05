export const getStoredUserInfo = () => {
  try {
    const userInfoStr = localStorage.getItem('userInfo');
    return userInfoStr ? JSON.parse(userInfoStr) : {};
  } catch (error) {
    console.error('Error parsing userInfo from localStorage:', error);
    return {};
  }
};