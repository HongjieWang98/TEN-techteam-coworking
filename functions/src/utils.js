export const respondWithErrorMessage = (res, errorMessage) => {
  return res.json({
    result: 'error',
    message: errorMessage
  });
};

export const validateEmail = (email) => {
  const emailPattern =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return emailPattern.test(email);
}

export const militaryTimePattern = /^([01]\d|2[0-3]):([0-5]\d)|24:00$/;