import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { NonRenduDirective } from './shared/non-rendu.directive';
import { FormsModule } from '@angular/forms';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AuthGuard } from './shared/auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './shared/AuthInterceptor';
import { ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatSelectModule} from '@angular/material/select';
import { SearchComponent } from './assignments/search/search.component';
import {MatTabsModule} from '@angular/material/tabs';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ListElevesComponent } from './eleves/list-eleves/list-eleves.component';
import { ListMatieresComponent } from './matieres/list-matieres/list-matieres.component';
import { ListProfsComponent } from './list-profs/list-profs.component';
import { NotationComponent } from './shared/notation/notation.component';
import { AnnulationRenduComponent } from './shared/annulation-rendu/annulation-rendu.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { AddeleveComponent } from './eleves/addeleve/addeleve.component';
import { AddMatiereComponent } from './matieres/add-matiere/add-matiere.component';
import { DetaileleveComponent } from './eleves/detaileleve/detaileleve.component';
import { EditeleveComponent } from './eleves/editeleve/editeleve.component';

const routes: Routes = [
  {
    path: "",
    component: AssignmentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "home",
    component: AssignmentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "add",
    component: AddAssignmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "assignment/:id",
    component: AssignmentDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    component: LoginComponent,
    
  },
  {
    path: "assignment/:id/edit",
    component: EditAssignmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "search",
    component: SearchComponent,
  },
  {
    path: "listEleve",
    component: ListElevesComponent,
  },
  {
    path: "addEleves",
    component: AddeleveComponent,
  },
  {
    path: "eleve/:id",
    component: DetaileleveComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "eleve/:id/edit",
    component: EditeleveComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "listProfs",
    component: ListProfsComponent,
  },
  {
    path: "listMat",
    component: ListMatieresComponent,
  }
]
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    NonRenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    LoginComponent,
    DialogComponent,
    SearchComponent,
    ListElevesComponent,
    ListMatieresComponent,
    ListProfsComponent,
    NotationComponent,
    AnnulationRenduComponent,
    AnnulationRenduComponent,
    AddeleveComponent,
    AddMatiereComponent,
    DetaileleveComponent,
    EditeleveComponent
  ],
  imports: [
    BrowserModule, MatSlideToggleModule,MatSelectModule,
    BrowserAnimationsModule,ReactiveFormsModule,DragDropModule,
    FormsModule, HttpClientModule,MatStepperModule,ScrollingModule,
    MatButtonModule, MatDividerModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatListModule,MatDialogModule,MatTabsModule,
    MatCardModule, MatCheckboxModule, MatProgressSpinnerModule, MatPaginatorModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent,NotationComponent,AnnulationRenduComponent]

})
export class AppModule { }
