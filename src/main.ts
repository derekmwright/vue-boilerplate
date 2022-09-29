import { createApp } from 'vue'
import './style.css'
import { router } from './router'
import { createColorScheme } from './plugins/ColorScheme'
import { Amplify, Auth } from 'aws-amplify'

import App from './App.vue'

Amplify.configure({
  Auth: {
    region: import.meta.env.VITE_APP_COGNITO_REGION,
    userPoolId: import.meta.env.VITE_APP_COGNITO_USERPOOLID,
    userPoolWebClientId: import.meta.env.VITE_APP_COGNITO_CLIENTID,
  },
});

const cs = createColorScheme({primary: "indigo"})

createApp(App).use(router).use(cs).mount('#app')
