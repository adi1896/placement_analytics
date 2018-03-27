import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes} from '@angular/router';


import { AppComponent } from './app.component';
import { ComponentsComponent } from './components/components.component';
import { HeaderComponent } from './components/header/header.component';
import { SocialiconsComponent } from './components/socialicons/socialicons.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ClientssectionComponent } from './components/clientssection/clientssection.component';

const appRoutes: Routes =[
  {path:'',component:HeaderComponent},


] 
@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    HeaderComponent,
    SocialiconsComponent,
    FooterComponent,
    AboutusComponent,
    ClientssectionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
