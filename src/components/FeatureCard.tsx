
type Props = {
  image: JSX.Element;
  title: string;
} & typeof defaultProps;

const defaultProps = {
  text: '',
  help: '',
};

const FeatureCard = (props: Props) => {
  const {image, title, text} = props;

  return (
      <>
        <div
            className="bg-white max-full cursor-pointer flex flex-col transform transition duration-500 hover:scale-105 shadow-xl overflow-hidden rounded-2xl p-2"
            data-test="feature-card-container"
        >
        <span className="w-full rounded-2xl max-h-96 max-h-1/2 h-1/2" data-test="feature-card-image">
          {image}
        </span>
        <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{title}</h3>
        <p className="text-base leading-7 text-gray-600">{text}</p>
        </div>
      </>
  );
};

export default FeatureCard;
