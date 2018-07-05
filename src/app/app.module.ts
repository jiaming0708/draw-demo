import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TrajectoryComponent } from './trajectory/trajectory.component';
import { PointBlockComponent } from './point-block/point-block.component';
import { LevelBlockComponent } from './level-block/level-block.component';
import { PointLineComponent } from './point-line/point-line.component';
import { LineArrowComponent } from './line-arrow/line-arrow.component';

@NgModule({
  declarations: [
    AppComponent,
    TrajectoryComponent,
    PointBlockComponent,
    LevelBlockComponent,
    PointLineComponent,
    LineArrowComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
