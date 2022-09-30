# Vue + Vite + TypeScript + AWS Cognito Authentication Boilerplate

The goal of this repo is to provide a good jumping off point to begin rapidly building out
an SPA with Vue3, Vite, and AWS Cognito for user authentication. There are some basic route guards
and views in place for demonstration purposes. The code also comes with a few UI components already
created that leverage tailwind CSS.

## Getting Started

To get started, clone this repository and create a `.env.local` file in the root with your
AWS Cognito UserPool properties:

```env
VITE_APP_COGNITO_REGION="<cognito_region>"
VITE_APP_COGNITO_USERPOOLID="<userpool_id>"
VITE_APP_COGNITO_CLIENTID="<app_client_id>"
```

## Development

Please feel free to send pull requests if you find glaring issues with the code. Submit an issue
if there is a feature you'd like to see in the boilerplate.
