const getCookie = (name) => {
  let value = document.cookie;
  let parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop().split(";").shift();
    // 뒤에있는 놈 잘라낸 후 앞에 있는 놈 ";"로 나눠준 뒤 앞에있는 놈 떼다 return
  }
};

const setCookie = (name, value, exp = 5) => {
  // 날짜 객체 만들어서 만료일 만들기
  let date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value}; expires=${date.toUTCString()}`;
};

const deleteCookie = (name) => {
  let date = new Date("2020-01-01").toUTCString;

  console.log(date);
  document.cookie = name + "=; expires=" + date;
};

export { getCookie, setCookie, deleteCookie };
