import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy, createAnimation } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    IonicModule.forRoot({
      navAnimation: (baseEl, opts) => {
        const entering = opts.enteringEl;
        const leaving = opts.leavingEl;

        const animation = createAnimation()
          .addElement(entering)
          .duration(250)
          .fromTo('opacity', '0', '1')
          .fromTo('transform', 'translateX(20px)', 'translateX(0)');

        if (leaving) {
          animation.addElement(leaving)
            .fromTo('opacity', '1', '0')
            .fromTo('transform', 'translateX(0)', 'translateX(-20px)');
        }

        return animation;
      }
    }),

    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    FormsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}