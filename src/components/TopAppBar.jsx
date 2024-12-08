import { IconBtn } from './Button';
import {
  useNavigation,
  useNavigate,
  useLoaderData,
  useParams,
  useSubmit,
} from 'react-router-dom';
import Avatar from './Avatar';
import Menu from './Menu';
import MenuItem from './MenuItem';
import { LinearProgress } from './Progress';
import { AnimatePresence } from 'framer-motion';
import { useToggle } from '../hooks/useToggle';
import logout from '../utils/logout';
import Logo from './Logo';
import PropTypes from 'prop-types';
import { use } from 'framer-motion/client';
import deleteConversation from '../utils/deleteConversation';
const TopAppBar = ({ toggleSidebar }) => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const { conversations, user } = useLoaderData();
  const params = useParams();
  const submit = useSubmit();
  const isNormalLoad = navigation.state === 'loading' && !navigation.formData;
  const [showMenu, setShowMenu] = useToggle();
  return (
    <header className='relative flex justify-between items-center h-16 px-4'>
      <div className='flex items-center gap-1'>
        <IconBtn
          icon='menu'
          title='Menu'
          classes='lg:hidden'
          onClick={toggleSidebar}
        />
        {/* <Logo classes='hidden lg:block' /> */}
      </div>

      {params.conversationId && (
        <IconBtn
          icon='delete'
          classes='ms-auto me-1 lg:hidden'
          onClick={() => {
            const { title } = conversations.documents.find(
              ({ $id }) => params.conversationId === $id,
            );
            deleteConversation({
              id: params.conversationId,
              title,
              submit,
            });
          }}
        />
      )}

      <div className='menu-wrapper'>
        <IconBtn onClick={setShowMenu}>
          <Avatar name={user.name} />
        </IconBtn>
        <Menu classes={showMenu ? 'active' : ''}>
          <MenuItem
            labelText='Log out'
            onClick={() => logout(navigate)}
          />
        </Menu>
      </div>
      <AnimatePresence>
        {isNormalLoad && (
          <LinearProgress classes='absolute top-full left-0 right-0 z-10' />
        )}
      </AnimatePresence>
    </header>
  );
};

TopAppBar.propTypes = {
  toggleSidebar: PropTypes.func,
};

export default TopAppBar;
