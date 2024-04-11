import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputComponent],
    });

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit query on fetchIp if query length is greater than or equal to 2', () => {
    const query = 'example';
    const queryEmitterSpy = spyOn(component.queryEmitter, 'emit');

    component.query = query;
    component.fetchIp();

    expect(queryEmitterSpy).toHaveBeenCalledWith(query);
  });

  it('should not emit query on fetchIp if query length is less than 2', () => {
    const queryEmitterSpy = spyOn(component.queryEmitter, 'emit');

    component.query = 'a';
    component.fetchIp();

    expect(queryEmitterSpy).not.toHaveBeenCalled();
  });

  it('should reset isError flag on resetError if isError is true', () => {
    component.isError = true;

    component.resetError();

    expect(component.isError).toBeFalse();
  });

  it('should not reset isError flag on resetError if isError is false', () => {
    component.isError = false;

    component.resetError();

    expect(component.isError).toBeFalse();
  });
});
