import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, useIonLoading, useIonRouter } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import './theme/modal.css';
import { useEffect } from 'react';
import { getDeviceID, setOrientation } from './utils/native.utils';
import { Pos } from './pages/pos/Pos';
import { Setup } from './pages/setup/Setup';
import { useDevice, useStore } from './hooks';
import { checkDevice } from './services';
import { AxiosResponse } from 'axios';
setupIonicReact();

const App: React.FC = () => {
  const { saveToken, saveUser, setDevice } = useDevice();
  const { fetchProducts, fetchMetadata, products } = useStore();
  const [loader, dismiss] = useIonLoading();
  const navigation = useIonRouter();

  useEffect(() => {
    setOrientation();
    fetchMetadata();
    initDevice();
  }, []);

  const initDevice = async () => {
    const device = await getDeviceID();
    setDevice(device);
    checkDeviceStatus(device);
  }

  const checkDeviceStatus = async (device: any) => {
    loader({
      message: 'Checking Device Information',
      duration: 10000
    });

    const response: AxiosResponse = await checkDevice(device);
    await dismiss();

    if (response.data?.success && response.data.data) {
      saveUser(response.data.data.user)
      saveToken(response.data.data.token);
      fetchProducts().then(() => {
        navigation.push('/order');
      });
    } else {
      navigation.push('/setup');

    }
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/setup">
            <Setup />
          </Route>
          <Route exact path="/order">
            <Pos />
          </Route>
          <Route exact path="/">
            <Redirect to="/setup" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
