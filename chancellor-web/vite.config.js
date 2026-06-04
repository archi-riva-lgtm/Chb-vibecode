import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const htmlPages = {
  main: resolve(import.meta.dirname, 'index.html'),
  rooms: resolve(import.meta.dirname, 'rooms.html'),
  dining: resolve(import.meta.dirname, 'dining.html'),
  facilities: resolve(import.meta.dirname, 'facilities.html'),
  offers: resolve(import.meta.dirname, 'offers.html'),
  nearbyPlaces: resolve(import.meta.dirname, 'nearby-places.html'),
  contact: resolve(import.meta.dirname, 'contact.html')
};

export default defineConfig({
  build: {
    rollupOptions: {
      input: htmlPages
    }
  }
});
