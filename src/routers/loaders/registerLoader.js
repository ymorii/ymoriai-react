import { redirect } from 'react-router-dom';
import { account } from '../../lib/appwrite';

const registerLoader = async () => {
  try {
    await account.get();
  } catch (err) {
    console.log(`error getting user seesion: ${err.message}`);
    return null;
  }
  return redirect('/');
};

export default registerLoader;
