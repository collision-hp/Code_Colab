import Avatar from 'react-avatar';

const Client = ({ username }) => (
  <div className="client">
    <Avatar name={username} size="40" round="14px" />
    <span className="username">{username}</span>
  </div>
);

export default Client;