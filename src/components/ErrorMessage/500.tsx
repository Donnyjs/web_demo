import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HOME_URL } from '@/config/config';

const NotNetwork = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate(HOME_URL);
  };
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Button type="primary" onClick={goHome}>
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotNetwork;
