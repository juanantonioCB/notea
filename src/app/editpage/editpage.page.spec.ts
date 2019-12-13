import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { EditpagePage } from './editpage.page';

describe('EditpagePage', () => {
  let component: EditpagePage;
  let fixture: ComponentFixture<EditpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpagePage ],
      imports: [IonicModule.forRoot(),ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(EditpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
