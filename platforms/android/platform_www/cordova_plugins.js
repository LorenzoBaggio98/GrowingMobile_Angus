cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-ble-central.ble",
    "file": "plugins/cordova-plugin-ble-central/www/ble.js",
    "pluginId": "cordova-plugin-ble-central",
    "clobbers": [
      "ble"
    ]
  },
  {
    "id": "cordova-plugin-bluetooth-status.BluetoothStatus",
    "file": "plugins/cordova-plugin-bluetooth-status/BluetoothStatus.js",
    "pluginId": "cordova-plugin-bluetooth-status",
    "clobbers": [
      "cordova.plugins.BluetoothStatus"
    ]
  },
  {
    "id": "cordova-plugin-fingerprint-aio.Fingerprint",
    "file": "plugins/cordova-plugin-fingerprint-aio/www/Fingerprint.js",
    "pluginId": "cordova-plugin-fingerprint-aio",
    "clobbers": [
      "Fingerprint"
    ]
  },
  {
    "id": "cordova-plugin-firebase-authentication.FirebaseAuthentication",
    "file": "plugins/cordova-plugin-firebase-authentication/www/FirebaseAuthentication.js",
    "pluginId": "cordova-plugin-firebase-authentication",
    "merges": [
      "cordova.plugins.firebase.auth"
    ]
  },
  {
    "id": "cordova-plugin-fullscreen.AndroidFullScreen",
    "file": "plugins/cordova-plugin-fullscreen/www/AndroidFullScreen.js",
    "pluginId": "cordova-plugin-fullscreen",
    "clobbers": [
      "AndroidFullScreen"
    ]
  },
  {
    "id": "cordova-plugin-ionic-keyboard.keyboard",
    "file": "plugins/cordova-plugin-ionic-keyboard/www/android/keyboard.js",
    "pluginId": "cordova-plugin-ionic-keyboard",
    "clobbers": [
      "window.Keyboard"
    ]
  },
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "cordova-plugin-badge.Badge",
    "file": "plugins/cordova-plugin-badge/www/badge.js",
    "pluginId": "cordova-plugin-badge",
    "clobbers": [
      "cordova.plugins.notification.badge"
    ]
  },
  {
    "id": "cordova-plugin-local-notification.LocalNotification",
    "file": "plugins/cordova-plugin-local-notification/www/local-notification.js",
    "pluginId": "cordova-plugin-local-notification",
    "clobbers": [
      "cordova.plugins.notification.local"
    ]
  },
  {
    "id": "cordova-plugin-local-notification.LocalNotification.Core",
    "file": "plugins/cordova-plugin-local-notification/www/local-notification-core.js",
    "pluginId": "cordova-plugin-local-notification",
    "clobbers": [
      "cordova.plugins.notification.local.core",
      "plugin.notification.local.core"
    ]
  },
  {
    "id": "cordova-plugin-local-notification.LocalNotification.Util",
    "file": "plugins/cordova-plugin-local-notification/www/local-notification-util.js",
    "pluginId": "cordova-plugin-local-notification",
    "merges": [
      "cordova.plugins.notification.local.core",
      "plugin.notification.local.core"
    ]
  },
  {
    "id": "cordova-plugin-statusbar.statusbar",
    "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
    "pluginId": "cordova-plugin-statusbar",
    "clobbers": [
      "window.StatusBar"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-ble-central": "1.1.9",
  "cordova-plugin-bluetooth-status": "1.0.4",
  "cordova-plugin-fingerprint-aio": "1.3.8",
  "cordova-support-android-plugin": "1.0.1",
  "cordova-support-google-services": "1.2.1",
  "cordova-plugin-firebase-authentication": "1.0.1",
  "cordova-plugin-fullscreen": "1.1.0",
  "cordova-plugin-ionic-keyboard": "2.1.2",
  "cordova-plugin-device": "2.0.2",
  "cordova-plugin-badge": "0.8.7",
  "cordova-plugin-local-notification": "0.9.0-beta.2",
  "cordova-plugin-statusbar": "2.4.2",
  "cordova-plugin-vibration": "3.1.0",
  "cordova-plugin-whitelist": "1.3.3"
};
// BOTTOM OF METADATA
});