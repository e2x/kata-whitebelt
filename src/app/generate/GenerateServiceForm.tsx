import {ChangeEvent, DragEvent, useEffect, useRef, useState} from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import classNames from "@/utils/Utils";
import {GenerationType, ServiceState} from "@/types";

export const GenerateServiceForm = () => {
  const [state, setState] = useState({} as ServiceState)
  const [dragActive, setDragActive] = useState(false);
  // ref
  const inputRef = useRef(null);

  useEffect(() => {
    setState({
      serviceName: 'kataservice1',
      serviceGenerationType: GenerationType.LAMBDA,
      serviceSpecification: '',
      serviceTargetName: '',
      uploadedYaml: ''
    })
  }, [])

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // at least one file has been dropped so do something
      // handleFiles(e.dataTransfer.files);
      console.log(e.dataTransfer.files)
      storeFile(e.dataTransfer.files[0])
    }
  };

  const handleGenerate = () => {
    console.log(`Generating ${JSON.stringify(state)}`)
    generateService(state).then(({blob, headers}) => {
      const contentDisposition = headers.get('Content-Disposition') || ''
      const filename = state.serviceName.toLowerCase() + ".zip"
      console.log(filename)
      const newBlob = new Blob([blob])
      const newUrl = window.URL.createObjectURL(newBlob)

      const link = document.createElement(('a'))
      link.href = newUrl
      link.setAttribute('download', filename)
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);

      window.URL.revokeObjectURL(newUrl);
    })
  }

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.target.files) {
      return;
    }

    // handle the input...
    storeFile(e.target.files[0])
  }

  const storeFile = (file: File) => {
    file.text().then((text) => {
      setState({...state, uploadedYaml: text})
    })
  }

  return (
      <>
        <div className="text-black">
          <div className="p-4 rounded-md bg-gray-200 md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 bg-gray-200 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Service Information</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Provide the service meta information and the specification in preparation for generation.
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form action="#" method="POST" onSubmit={(ev) => {
                ev.preventDefault()
                handleGenerate()
              }}>
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3">
                        <label htmlFor="service-name" className="block text-sm font-medium text-gray-700">
                          Service Name
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                            Target
                          </span>
                          <input
                              type="text"
                              name="service-name"
                              id="service-name"
                              className="text-black block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              placeholder="kataservice1"
                              value={state.serviceName || ''}
                              onChange={(ev) => {setState({...state, serviceName: ev.target.value})}}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="generation-type" className="block text-sm font-medium text-gray-700">
                        Generation Type
                      </label>
                      <div className="mt-1">
                        <select
                            id="generation-type"
                            name="generation-type"
                            autoComplete="generation-type"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={state.serviceGenerationType}
                            onChange={(ev) => {setState({...state, serviceGenerationType: ev.target.value as GenerationType})}}
                        >
                          <option value={GenerationType.FE}>Front end (Typescript)</option>
                          <option value={GenerationType.BE}>Java Spring Boot</option>
                          <option value={GenerationType.LAMBDA}>Typescript Lambda Serverless</option>
                        </select>
                      </div>
                    </div>

                    <div className={classNames(dragActive ? 'border-1' : '')} onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                      <label  className={'block text-sm font-medium text-gray-700'}>Upload Yaml</label>
                      <div className={classNames(
                          dragActive ? 'border-solid bg-sky' : 'border-dashed bg-white',
                          'mt-1 flex justify-center rounded-md border-2 border-gray-300 px-6 pt-5 pb-6')}
                           onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                      >
                        <div className="space-y-1 text-center">
                          <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                          >
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input ref={inputRef} id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(ev) => handleFile(ev)}/>
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">OpenAPI YAML up to 10MB</p>
                        </div>
                      </div>
                      { dragActive && <div id="drag-file-element"></div> }
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Generate
                    </button>
                  </div>
                  { state.uploadedYaml !== '' &&
                    <div className="flex-none justify-center space-y-5 items-center p-1 shadow-inner">
                      <div className="flex-1 yaml overflow-y">
                        <SyntaxHighlighter
                            language="yaml"
                            wrapLines
                            data-test="service-yaml"
                            className="h-full"
                            showLineNumbers
                        >
                          {state.uploadedYaml}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
  )
}

async function generateService(state: ServiceState) {
  const payload = {
    serviceName: state.serviceName,
    generationType: state.serviceGenerationType,
    serviceSpecification: state.uploadedYaml
  }
  const res = await fetch('http://localhost:8089/v1/service/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const blob = await res.blob()
  res.headers.forEach(h => console.log(JSON.stringify(h)))
  return {blob, headers: res.headers};
}

export default GenerateServiceForm;