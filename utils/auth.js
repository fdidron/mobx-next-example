import Cookie from 'js-cookie';

const cookieKey = 'user';

export const destroyUserCookie = () => Cookie.remove(cookieKey);

export const getUserFromCookie = (req) => {
  const { cookie } = req.headers;
  if (!cookie) {
    return null;
  }
  const userCookie = cookie.split(';')
    .find(c =>
      c.trim().startsWith(`${cookieKey}=`),
    );
  if (!userCookie) {
    return null;
  }
  const user = decodeURIComponent(userCookie.split(`${cookieKey}=`)[1]);
  return JSON.parse(user);
};

export const setUserCookie = user =>
  Cookie.set(cookieKey, JSON.stringify(user));

