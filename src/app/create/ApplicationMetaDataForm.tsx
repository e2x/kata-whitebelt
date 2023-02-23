import {useEffect, useRef, useState} from "react";
import {ApplicationCreateState} from "@/types";
import ServiceOptionsCard from "@/app/create/ServiceOptionsCard";
import Link from "next/link";
import FeatureCard from "@/components/FeatureCard";
import CreateLottie from "@/components/lottie/Create";


const services =
    [{
      "service": "basket",
      "implementations": {
        "commercetools": {"icon": "commercetools_logo", "location": "kata-service/basket"},
        "bigcommerce": {"icon": "bigcommerce_logo", "location": "kata-service/bigc-basket"},
        "generic": {"icon": "basket", "location": "service/basket"},
        "magento": {"icon": "magento_logo", "location": "kata-service/magentobasket"}
      }
    }, {
      "service": "catalog",
      "implementations": {
        "commercetools": {"icon": "commercetools_logo", "location": "kata-service/catalog"},
        "bigcommerce": {"icon": "bigcommerce_logo", "location": "kata-service/bigc-catalog"},
        "generic": {"icon": "catalog", "location": "service/catalog"},
        "magento": {"icon": "magento_logo", "location": "kata-service/magentocatalog"}
      }
    }, {
      "service": "content",
      "implementations": {
        "contentful": {"icon": "contentful_logo", "location": "kata-service/contentful"},
        "contentstack": {"icon": "contentstack_logo", "location": "kata-service/contentstack"},
        "magnolia": {"icon": "magnolia_logo", "location": "kata-service/magnolia"},
        "amplience": {"icon": "amplience_logo", "location": "kata-service/content"},
        "generic": {"icon": "content", "location": "service/content"}
      }
    }, {
      "service": "customer",
      "implementations": {
        "commercetools": {"icon": "commercetools_logo", "location": "kata-service/customer"},
        "bigcommerce": {"icon": "bigcommerce_logo", "location": "kata-service/bigc-customer"},
        "generic": {"icon": "customer", "location": "service/customer"},
        "magento": {"icon": "magento_logo", "location": "kata-service/magentocustomer"}
      }
    }, {
      "service": "payment",
      "implementations": {
        "commercetools/visa": {"icon": "visa_logo", "location": "kata-service/payment"},
        "generic": {"icon": "payment", "location": "service/payment"}
      }
    }, {
      "service": "recommendations",
      "implementations": {"generic": {"icon": "recommendations", "location": "service/recommendations"}}
    }, {
      "service": "search",
      "implementations": {
        "commercetools": {"icon": "commercetools_logo", "location": "kata-service/search"},
        "algolia": {"icon": "algolia_logo", "location": "kata-service/algolia-search"},
        "lucidworks": {"icon": "lucidworks_logo", "location": "kata-service/lucidsearch"},
        "bigcommerce": {"icon": "bigcommerce_logo", "location": "kata-service/bigc-search"},
        "generic": {"icon": "search", "location": "service/search"},
        "magento": {"icon": "magento_logo", "location": "kata-service/magentosearch"}
      }
    }]

export const ApplicationMetaDataForm = () => {
  const [state, setState] = useState({} as ApplicationCreateState)
  const [step, setStep] = useState(1)

  useEffect(() => {
    setState({
      applicationName: 'kata-app-1',
      applicationDescription: '',
      sourceRepositoryUrl: 'github.com',
      gitUsername: '',
      selectedServices: []
    })
  }, [])

  const updateServices = (
      serviceName: string,
      service: string,
      icon: string
  ) => {
    const selectedServices = state.selectedServices
    const data = {...selectedServices};
    if (
        // @ts-ignore
        data[serviceName] &&
        // @ts-ignore
        data[serviceName].service === service &&
        // @ts-ignore
        data[serviceName].icon === icon
    ) {
      // @ts-ignore
      delete data[serviceName];
    } else {
      // @ts-ignore
      data[serviceName] = {service, icon};
    }
    setState({...state, selectedServices: data});
  };

  return (
      <>
        <div className="text-black">
          <div className="p-4 rounded-md bg-gray-200 md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 bg-gray-200 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Service Information</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Provide the application meta information required to create a new KATA Application.
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form action="#" method="POST" onSubmit={(ev) => {
                ev.preventDefault()
              }}>
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3">
                        <label htmlFor="service-name" className="block text-sm font-medium text-gray-700">
                          Application Name
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <span
                              className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                            Target
                          </span>
                          <input
                              type="text"
                              name="service-name"
                              id="service-name"
                              className="text-black block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              placeholder="kataservice1"
                              value={state.applicationName || ''}
                              onChange={(ev) => {
                                setState({...state, applicationName: ev.target.value})
                              }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {step > 1 &&
                      <>
                          <div
                              className="p-4 divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow">
                              <h2 className="sr-only" id="quick-links-title">
                                  Quick links
                              </h2>

                              <div className="">
                                  <ul className="h-full items-center grid grid-cols-2 gap-x-6 gap-y-12 space-y-0">
                                    {services.map((service: any) => (
                                        <li
                                            data-test="service-container"
                                            className="h-full "
                                            key={service.service}
                                        >
                                            <ServiceOptionsCard
                                                key={service.service}
                                                serviceType={service}
                                                updateSelectedService={updateServices}
                                                selectedServices={state.selectedServices}
                                            />
                                        </li>
                                    ))}
                                  </ul>
                              </div>
                          </div>
                      </>
                  }
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => {
                          setStep(step + 1)
                        }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
  )
}

export default ApplicationMetaDataForm;