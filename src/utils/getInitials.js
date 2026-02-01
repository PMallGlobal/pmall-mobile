const getInitials = (name) => {
  if (name) {
    let arr = name?.split("");
    return arr[0];
  }
  return false;
};

export default getInitials;
