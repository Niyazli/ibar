import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { UserModule } from '../user/user.module';
import { ArticleModule } from '../article/article.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    UserModule,
    ArticleModule,
    MaterialModule,
  ],
})
export class HomeModule {}
