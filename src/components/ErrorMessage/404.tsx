import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HOME_URL } from '@/config/config';

const NotFound = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate(HOME_URL);
  };
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={goHome}>
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
