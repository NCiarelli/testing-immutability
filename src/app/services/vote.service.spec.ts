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

  // TODO - test removeItem

  it("should find item and remove from list", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Cat");
    service.removeItem("Cat");
    expect(service.getItems()).toEqual([]);
  });

  // TODO - test removeItem & undo
  it("should check undo for remove item", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Cat");
    service.removeItem("Cat");
    service.undo();
    expect(service.getItems()).toEqual([
      { name: "Cat", votes: 0 }
    ]);
  });

  // TODO - test upvote
  it("should give 1 vote to Cat", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Cat");
    service.upvote("Cat");
    expect(service.getItems()).toEqual([
      { name: "Cat", votes: 1 }
    ]);
  });
  // TODO - test upvote & undo
  it("should give 1 vote to Cat, buut then undo it", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Cat");
    service.upvote("Cat");
    service.undo()
    expect(service.getItems()).toEqual([
      { name: "Cat", votes: 0 }
    ]);
  });
  // TODO - test downvote
  it("should give 1 vote to Cat", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Cat");
    service.upvote("Cat");
    service.upvote("Cat");
    service.downvote("Cat");
    expect(service.getItems()).toEqual([
      { name: "Cat", votes: 1 }
    ]);
  });
  // TODO - test downvote & undo
  it("should give 1 vote to Cat", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Cat");
    service.upvote("Cat");
    service.upvote("Cat");
    service.downvote("Cat");
    service.undo();
    expect(service.getItems()).toEqual([
      { name: "Cat", votes: 2 }
    ]);
  });
});
