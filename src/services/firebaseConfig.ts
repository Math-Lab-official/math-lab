// Firebase Configuration loaded from firebase-applet-config.json
import appletConfig from '../../firebase-applet-config.json';

const projectId = appletConfig.projectId || "gen-lang-client-0490955215";

export const firebaseConfig = {
  projectId,
  appId: appletConfig.appId || "1:533381389569:web:cda7c3d62bef8689240f00",
  apiKey: appletConfig.apiKey || "AIzaSyCsUN708eiTmNuSN3q3aQeBF46WPC4eU0Q",
  authDomain: appletConfig.authDomain || `${projectId}.firebaseapp.com`,
  storageBucket: appletConfig.storageBucket || `${projectId}.firebasestorage.app`,
  messagingSenderId: appletConfig.messagingSenderId || "533381389569",
  databaseURL: (appletConfig as any).databaseURL || `https://${projectId}-default-rtdb.firebaseio.com`,
};
