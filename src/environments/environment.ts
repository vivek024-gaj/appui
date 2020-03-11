// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'http://192.168.0.62:8086',
  pageSize: 20,
  allowOrigin: 'http://localhost:4200',
  imageResizeWidth: 320,
  imageResizeHeight: 220,
  preserveImageAspectRatio: true
};
