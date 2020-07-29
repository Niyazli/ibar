import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { MaterialModule } from '../material/material.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [ArticleListComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [ArticleListComponent],
})
export class ArticleModule {}
