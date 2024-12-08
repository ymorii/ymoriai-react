import { Link } from 'react-router-dom';
import logoLight from '../assets/logo-light.svg';
import logoDark from '../assets/logo-dark.svg';
import PropTypes from 'prop-types';
const Logo = ({ classes = '' }) => {
  return (
    <Link
      to='/'
      className='min-w-max max-w-max h-[24px] lg:hidden'
    >
      <img
        src={logoLight}
        width={133}
        height={24}
        alt='MoriAI logo'
        className='dark:hidden'
      />
      <img
        src={logoDark}
        width={133}
        height={24}
        alt='MoriAI logo'
        className='hidden dark:block'
      />
    </Link>
  );
};

Logo.propTypes = {
  classes: PropTypes.string,
};

export default Logo;
