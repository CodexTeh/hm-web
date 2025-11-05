const API_URL = process.env.REACT_APP_API_URL;
export const Api = {
  createAccount: async (data, language) => {
    const { username, email, password, phone, address } = data;
    const isRTL = language === 'ar';

    try {
      let response;
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Content-Security-Policy': 'default-src https:; script-src https: http:',
        },
        body: JSON.stringify({ username: username, email: email, password: password, phone: phone, location: address }),
      };

      response = await fetch(`${API_URL}auth/signup`, options);

      switch (response.status) {
        case 200:
          const data = await response.json();
          return data;
        case 400:
          throw new Error(!isRTL ? 'All fields required!' : 'جميع الحقول مطلوبة!');
        case 409:
          throw new Error(!isRTL ? 'User already exists!' : 'المستخدم موجود بالفعل!');
        default:
          throw new Error('Something went wrong!');

      }
    } catch (e) {
      throw new Error(e.message);

    }
  },
  signIn: async (data, language) => {
    const { email, password } = data;
    const isRTL = language === 'ar';

    try {
      let response;
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Content-Security-Policy': 'default-src https:; script-src https: http:',
        },
        body: JSON.stringify({ email: email, password: password }),
      };

      response = await fetch(`${API_URL}auth/signin`, options);
      switch (response.status) {
        case 200:
          const data = await response.json();
          return data;
        case 401:
          throw new Error(!isRTL ? 'Invalid email or password!' : 'البريد الإلكتروني أو كلمة المرور غير صحيحة!');
        case 404:
          throw new Error(!isRTL ? 'User does not exists!' : 'المستخدم غير موجود!');
        case 400:
          throw new Error(!isRTL ? 'All fields required!' : 'جميع الحقول مطلوبة!');
        case 409:
          throw new Error(!isRTL ? 'User already exists!' : 'المستخدم موجود بالفعل!');

        default:
          throw new Error('Something went wrong!');
      }
    } catch (e) {
      throw new Error(e.message);
    }
  },
  forgetPassword: async ({ email }, language) => {
    const isRTL = language === 'ar';

    try {
      let response;
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ email: email.toLowerCase() }),
      };
      response = await fetch(`${API_URL}auth/forgetPassword`, options);

      switch (response.status) {
        case 200:
          const data = await response.json();
          alert(!isRTL ? 'Reset Email has been sent to your mail!' : 'تم إرسال بريد إعادة التعيين إلى بريدك الإلكتروني!');
          return data;
        case 401:
          throw new Error(!isRTL ? 'User does not exists!' : 'المستخدم غير موجود!');
        case 400:
          throw new Error('All fields required!');
        default:
          throw new Error('Something went wrong!');
      }
    } catch (e) {
      alert(e.message);
      console.log("Error", e);
    }
  },
  logout: async () => {

  }
}