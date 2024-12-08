import { redirect } from 'react-router-dom';

import { account } from '../../lib/appwrite';

const resetLinkLoader = async () => {
  try {
    await account.get();
    console.log(user);
  } catch (err) {
    console.log(`error getting user seesion: ${err.message}`);
    return null;
  }
  return redirect('/');
};

export default resetLinkLoader;
