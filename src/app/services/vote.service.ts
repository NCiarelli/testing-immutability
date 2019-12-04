import { Injectable } from '@angular/core';
import { VoteItem } from '../interfaces/vote-item';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private history: VoteItem[][] = [];
  private items: VoteItem[] = [];

  constructor() { }

  getItems(): VoteItem[] {
    return this.items;
  }

  addItem(name: string): void {
    this.markHistoryBeforeChange();

    const newItem: VoteItem = { name, votes: 0 };
    // TODO - this needs to be immutable, otherwise history changes as well
    // this.items.push(newItem);
    // Immutable push - spread operator the original array, then add the new item on the end in an array literal
    this.items = [...this.items, newItem];
  }

  removeItem(name: string): void {
    this.markHistoryBeforeChange();
    // Go through the items array and find the index of the item 
    // where the item.name matches the input name, and store it
    let i = this.items.findIndex(item => item.name === name);
    // Delete the item at the found index
    // this.items.splice(i, 1);

    // TODO find the item in the list and remove it immutably
    // Take the section of items before i and the section of items after i 
    // and create a new array with the items in those partial arrays
    this.items = [...this.items.slice(0, i), ...this.items.slice(i + 1)];
  }

  upvote(name: string): void {
    this.markHistoryBeforeChange();

    // TODO find the item in the list according to the input name and add 1 to the votes
    // // Find the index of the item to be upvoted
    // let i = this.items.findIndex(item => item.name === name);
    // // Get a variable referencing the item for ease of use
    // let itemUp = this.items[i];
    // // Make the new copy of the items array with a new copy of the upvote item with an incresed vote count
    // this.items = [...this.items.slice(0, i),
    // { ...itemUp, votes: itemUp.votes + 1 },
    // ...this.items.slice(i + 1)];
    this.voteChange(name, 1);
  }

  downvote(name: string): void {
    this.markHistoryBeforeChange();

    // TODO find the item in the list and remove 1 from the votes
    // // Find the index of the item to be upvoted
    // let i = this.items.findIndex(item => item.name === name);
    // // Get a variable referencing the item for ease of use
    // let itemUp = this.items[i];
    // // Make the new copy of the items array with a new copy of the upvote item with an incresed vote count
    // this.items = [...this.items.slice(0, i),
    // { ...itemUp, votes: itemUp.votes - 1 },
    // ...this.items.slice(i + 1)];
    this.voteChange(name, -1);
  }

  voteChange(name: string, changeAmount: number): void {
    // Find the index of the item to be upvoted
    let i = this.items.findIndex(item => item.name === name);
    // Get a variable referencing the item for ease of use
    let itemUp = this.items[i];
    // Make the new copy of the items array with a new copy of the upvote item with an incresed vote count
    this.items = [...this.items.slice(0, i),
    { ...itemUp, votes: itemUp.votes + changeAmount },
    ...this.items.slice(i + 1)];
  }

  undo() {
    if (this.history.length) {
      // Take the most recent history and use it to replace the list.
      this.items = this.history.pop();
    } else {
      throw new Error("No more undos available.");
    }
  }

  private markHistoryBeforeChange() {
    // Add a snapshot to the history.
    this.history.push(this.items);
  }
}
