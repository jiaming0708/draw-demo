import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TrajectoryComponent } from './trajectory/trajectory.component';
import { LevelBlockDirective } from './level-block.directive';
import { PointBlockComponent } from './point-block/point-block.component';
import { LevelBlockComponent } from './level-block/level-block.component';

@NgModule({
  declarations: [
    AppComponent,
    TrajectoryComponent,
    LevelBlockDirective,
    PointBlockComponent,
    LevelBlockComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
