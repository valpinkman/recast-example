import { string } from 'prop-types';
import getAvatar from '../../../services/avatar';

const Avatar = ({ username }) => (
  <span>
    <style jsx>{`
      .avatar {
        border-radius: 50%;
      }
    `}
    </style>
    <img src={getAvatar(username)} className="avatar"/>
  </span>
);

Avatar.propTypes = {
  username: string.isRequired
};

export default Avatar;
