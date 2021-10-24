import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {ONESIGNAL_APP_ID} from '@env';

import OneSignal from 'react-native-onesignal';

OneSignal.setLogLevel(6, 0);
OneSignal.setAppId(ONESIGNAL_APP_ID);

// OneSignal.promptForPushNotificationsWithUserResponse(response => {
//   console.log('Prompt response:', response);
// });

OneSignal.setNotificationWillShowInForegroundHandler(
  notificationReceivedEvent => {
    // console.log(
    //   'OneSignal: notification will show in foreground:',
    //   notificationReceivedEvent,
    // );
    let notification = notificationReceivedEvent.getNotification();
    // console.log('notification: ', notification);
    // const data = notification.additionalData;
    // console.log('additionalData: ', data);

    notificationReceivedEvent.complete(notification);
  },
);

OneSignal.setNotificationOpenedHandler(notification => {
  // console.log('OneSignal: notification opened:', notification);
});

AppRegistry.registerComponent(appName, () => App);
