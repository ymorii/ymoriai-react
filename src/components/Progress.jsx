import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
const CircularProgress = ({ classes = '', size = '' }) => {
  return (
    <div
      role='progressbar'
      className={`circular-progress ${size} ${classes}`}
    ></div>
  );
};

CircularProgress.propTypes = {
  classes: PropTypes.string,
  size: PropTypes.string,
};

const LinearProgress = ({ classes = '' }) => {
  const progressbarVariant = {
    start: { scale: 0 },
    end: {
      scaleY: 1,
      transition: {
        when: 'beforeChildren',
        duration: 0.2,
        ease: 'easeOut',
        delay: 0.5,
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        duration: 0.1,
        ease: 'easeOut',
      },
    },
  };

  const activeIndicatorVariant = {
    start: { translateX: '-100%' },
    end: {
      translateX: '100%',
    },
  };
  return (
    <motion.div
      role='progressbar'
      variants={progressbarVariant}
      initial='start'
      animate='end'
      exit='exit'
      className='linear-progress'
    >
      <motion.div
        variants={activeIndicatorVariant}
        transition={{ repeat: Infinity, duration: 1.5, ease: [0.2, 0, 0, 1] }}
        className='active-indicator'
      ></motion.div>
    </motion.div>
  );
};

LinearProgress.propTypes = {
  classes: PropTypes.string,
};

export { CircularProgress, LinearProgress };
