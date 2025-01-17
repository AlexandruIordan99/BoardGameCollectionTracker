import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBoardGamesComponent } from './manage-board-games.component';

describe('ManageBoardGamesComponent', () => {
  let component: ManageBoardGamesComponent;
  let fixture: ComponentFixture<ManageBoardGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageBoardGamesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBoardGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
