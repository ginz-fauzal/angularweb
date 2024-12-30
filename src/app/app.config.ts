import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { NgOptimizedImage } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environment/environment';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    importProvidersFrom(
      AngularFireModule.initializeApp(environment.firebase),
      NgOptimizedImage,
      BrowserModule, 
      BrowserAnimationsModule,
    ),
    provideHttpClient(withFetch()),
    providePrimeNG({
        theme: {
            preset: Aura
        }
    }),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideFirebaseApp(() => initializeApp({ 
      projectId: "sigercep-ef86a", 
      appId: "1:56762198450:web:551ec62d974ddb50679cab", 
      storageBucket: "sigercep-ef86a.firebasestorage.app", 
      apiKey: "AIzaSyBoVeDiulgt2hKdDzn5RkWrNx-g-hR_Xow", 
      authDomain: "sigercep-ef86a.firebaseapp.com", 
      messagingSenderId: "56762198450", 
      measurementId: "G-ZVKH97NH3L" })), 
      provideAuth(() => getAuth()), 
      provideFirestore(() => getFirestore()), 
      provideDatabase(() => getDatabase()), 
      provideMessaging(() => getMessaging()), 
      provideStorage(() => getStorage())
  ]
};
