import SignUpLogIn from '../components/SignUpLogIn';

interface Page {
  bool: {
    bool: boolean;
  };
}

const Login: React.FC<Page> = ({ bool }) => {
  return (
    <div>
      <SignUpLogIn bool={bool}/>
    </div>
  )
}
export default Login;