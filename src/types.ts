
export type IUserNavigation = {
  name: string
  href: string
}


export type INavigation = {
  name: string
  href: string
  current: boolean
}

export type IStatsType = {
  label: string,
  value: number
}


export type ApplicationCreateState = {
  applicationName: string | undefined,
  applicationDescription: string | undefined,
  sourceRepositoryUrl: string,
  gitUsername: string,
  selectedServices: string[]
}

export enum GenerationType {
  FE = "fe",
  BE = "be",
  LAMBDA = "lambda"
}

export type ServiceState = {
  serviceName: string,
  serviceSpecification: string,
  serviceTargetName: string,
  serviceGenerationType: GenerationType,
  uploadedYaml: string
}
