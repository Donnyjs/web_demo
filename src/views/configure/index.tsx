import { useLocation } from 'react-router-dom';

const Configure = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data);
  return (
    <div className=" flex h-full items-center justify-center">
      <div></div>
    </div>
  );
};

export default Configure;
