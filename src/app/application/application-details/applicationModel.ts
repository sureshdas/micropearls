class ApplicationModel {
  description: string;
  applicationImage: string;
  applicationLogo: string;
  applicationName: string;
  constructor(
    description: string,
    applicationImage: string,
    applicationLogo: string,
    applicationName: string
  ) {
    this.description = description;
    this.applicationImage = applicationImage;
    this.applicationLogo = applicationLogo;
    this.applicationName = applicationName;
  }
}

export default ApplicationModel;
