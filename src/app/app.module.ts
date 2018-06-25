import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';


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
import { HttpModule,Http,Response,RequestOptions,Headers,URLSearchParams } from '@angular/http';
import { LoginComponent } from './components/login/login.component';
import {ElasticsearchService} from './elasticsearch.service';
import { SignupComponent } from './components/signup/signup.component';
import { AdsComponent } from './components/ads/ads.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AdsenseModule } from 'ng2-adsense';
import { LoadingModule } from 'ngx-loading';
import { FormComponent } from './components/form/form.component';





const appRoutes: Routes =[
  {path:'',component:HomeComponent},
  {path:'form',component:FormComponent}


] ;
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
    CollegeresultsComponent,
    LoginComponent,
    SignupComponent,
    AdsComponent,
    FormComponent,
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    NgxPaginationModule,
    FormsModule,
    LoadingModule,
    RouterModule.forRoot(appRoutes),
    AdsenseModule.forRoot({
      adClient: 'ca-pub-2339792171787324',
      adSlot: 7694040287,
    })

  ],
  providers: [ServiceService,ElasticsearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
