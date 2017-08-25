import { string } from 'prop-types';
import getAvatar from '../../../services/avatar';

const Avatar = ({ username }) => (
  <span>
    <style jsx>{`
      .avatar {
        width: 100%;
        border-radius: 50%;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
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
