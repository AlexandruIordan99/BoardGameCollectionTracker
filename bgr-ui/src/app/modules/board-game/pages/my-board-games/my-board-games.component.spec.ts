import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBoardGamesComponent } from './my-board-games.component';

describe('MyBoardGamesComponent', () => {
  let component: MyBoardGamesComponent;
  let fixture: ComponentFixture<MyBoardGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyBoardGamesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBoardGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
