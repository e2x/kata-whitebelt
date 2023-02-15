import Lottie from 'react-lottie-player';
import animationData from './data.json';

type Props = {
  play: boolean;
};

const lottie = ({play}: Props) => {
  const defaultOptions = {
    loop: true,
    play,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
      className: 'items-center w-full max-h-60 h-60',
    },
    background: '#FFF',
  };
  return (
      <>
        <div
            className="lottie-container items-center flex max-h-60 h-60 justify-center"
            data-test="lottie"
        >
          <Lottie
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...defaultOptions}
          />
        </div>
      </>
  );
};

export default lottie;
