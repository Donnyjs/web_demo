import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HOME_URL } from '@/config/config';

const NotAuth = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate(HOME_URL);
  };
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary" onClick={goHome}>
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotAuth;
