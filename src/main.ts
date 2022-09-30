import { createApp } from 'vue'
import './style.css'
import { router } from './router'
import { Amplify } from 'aws-amplify'

import App from './App.vue'

Amplify.configure({
  Auth: {
    region: import.meta.env.VITE_APP_COGNITO_REGION,
    userPoolId: import.meta.env.VITE_APP_COGNITO_USERPOOLID,
    userPoolWebClientId: import.meta.env.VITE_APP_COGNITO_CLIENTID,
  },
});

createApp(App).use(router).mount('#app')
