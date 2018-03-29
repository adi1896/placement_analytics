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
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { ServiceService } from './service.service';
import { CollegeresultsComponent } from './components/collegeresults/collegeresults.component';
import { HttpClientModule } from '@angular/common/http';

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
    ClientssectionComponent,
    ContactComponent,
    HomeComponent,
    CollegeresultsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
