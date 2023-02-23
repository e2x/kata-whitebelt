/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */

import useIcons from '../../utils/UseIcons';
import Image from "next/image";
import Default from '../../assets/serviceicons/default.png';

interface Props {
  serviceType: { service: string; implementations: any };
  updateSelectedService: (
      serviceName: string,
      value: string,
      icon: string
  ) => void;
  selectedServices: any;
}

const ServiceOptionsCard = ({
                              serviceType,
                              updateSelectedService,
                              selectedServices,
                            }: Props) => {
  const icons = useIcons();

  return (
      <div
          className="flex flex-col items-center shadow-xl rounded-md space-y-5 py-5 border-dashed border-2 border-sky-500"
          key={serviceType.service}
          data-test="api-card-container"
      >
        <h1 data-test="api-service-name" className="text-xl">
          {serviceType.service.toUpperCase()}
        </h1>
        <div className="flex flex-row justify-around w-4/5 h-20">
          {Object.keys(serviceType.implementations).map((val) => (
              <button
                  data-test="api-service-button"
                  className={`hover:scale-125 transform transition duration-500 p-2 ${
                      selectedServices[serviceType.service]?.service === val
                          ? 'border-2 border-sky-300 rounded-md'
                          : 'bg-white px-4'
                  }`}
                  onClick={() =>
                      updateSelectedService(
                          serviceType.service,
                          val,
                          `${serviceType.implementations[val].icon}`
                      )
                  }
                  key={val}
              >
                <Image
                    data-test="api-service-icon"
                    className={`h-10 w-10 ${
                        selectedServices[serviceType.service] &&
                        selectedServices[serviceType.service].service !== val
                            ? `filter grayscale ${selectedServices[serviceType.service]}`
                            : ''
                    }`}
                    src={icons.get(serviceType.implementations[val].icon) || Default}
                    alt=""
                />
              </button>
          ))}
        </div>
        <p data-test="selected-service">
          {selectedServices[serviceType.service]?.service}&nbsp;
        </p>
      </div>
  );
};

export default ServiceOptionsCard;
