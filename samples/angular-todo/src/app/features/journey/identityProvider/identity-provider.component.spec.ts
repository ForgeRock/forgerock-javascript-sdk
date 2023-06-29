import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdentityProviderComponent } from './identity-provider.component';

describe('IdentityProviderComponent', () => {
  let component: IdentityProviderComponent;
  let fixture: ComponentFixture<IdentityProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdentityProviderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IdentityProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
