import { Device } from '@capacitor/device';
import { Network } from '@capacitor/network';
import { isPlatform } from "@ionic/react";
import Logger from './logger.utils';
import { useDeviceStore } from '../store';
import { ScreenOrientation } from '@capacitor/screen-orientation';

export const getDeviceID = async () => {
    if (isPlatform('capacitor')) {
        const info = await Device.getInfo();
        return {
            uuid: (await Device.getId()).identifier,
            model: info.model,
            platform: info.platform
        };
    }

    return {
        uuid: 'testdeviceuuid',
        model: 'testdevicemodel',
        platform: 'web'
    };
}

export const setOrientation = () => {
    if (isPlatform('capacitor')) {
        ScreenOrientation.lock({ orientation: 'landscape' });
    }
}