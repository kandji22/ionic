import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapperComponent } from './mapper.component';

describe('MapperComponent', () => {
  let component: MapperComponent;
  let fixture: ComponentFixture<MapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapperComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
