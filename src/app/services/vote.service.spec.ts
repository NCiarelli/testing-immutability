import { TestBed } from '@angular/core/testing';

import { VoteService } from './vote.service';

describe('VoteServiceService', () => {
  
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should start empty', () => {
    const service: VoteService = TestBed.get(VoteService);
    expect(service.getItems()).toEqual([]);
  });

  it('should add to the list', () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    service.addItem("Beta");
    expect(service.getItems()).toEqual([
      { name: "Alpha", votes: 0 },
      { name: "Beta", votes: 0 }
    ]);
  });

  it('should be able to undo after adding', () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    service.addItem("Beta");
    service.undo();
    expect(service.getItems()).toEqual([
      { name: "Alpha", votes: 0 }
    ]);
    service.undo();
    expect(service.getItems()).toEqual([]);
  });

  // TODO - test removeItem & undo
  // TODO - test removeItem
  // TODO - test upvote
  // TODO - test upvote & undo
  // TODO - test downvote
  // TODO - test downvote & undo
});
