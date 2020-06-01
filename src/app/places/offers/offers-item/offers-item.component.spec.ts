import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OffersItemComponent } from './offers-item.component';

describe('OffersItemComponent', () => {
  let component: OffersItemComponent;
  let fixture: ComponentFixture<OffersItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersItemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OffersItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
