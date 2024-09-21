
import { Drivers, Storage } from '@ionic/storage';
import { StateStorage } from 'zustand/middleware';

const storage = new Storage({
    name: '__dudePOS',
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
});


export const ionicStorage: StateStorage = {
    setItem: async (name: string, value: any): Promise<any> => {

        await storage.create();
        return await storage.set(name, value);
    },
    getItem: async (name: string): Promise<any> => {
        await storage.create();
        return await storage.get(name);
    },
    removeItem: async (name: string): Promise<any> => {
        await storage.create();
        return await storage.remove(name);
    }
};