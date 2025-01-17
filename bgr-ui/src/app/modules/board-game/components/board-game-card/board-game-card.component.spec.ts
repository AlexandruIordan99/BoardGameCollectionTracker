import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGameCardComponent } from './board-game-card.component';

describe('BoardGameCardComponent', () => {
  let component: BoardGameCardComponent;
  let fixture: ComponentFixture<BoardGameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardGameCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardGameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
