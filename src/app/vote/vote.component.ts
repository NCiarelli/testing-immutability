import { Component, OnInit } from '@angular/core';
import { VoteService } from '../services/vote.service';
import { VoteItem } from '../interfaces/vote-item';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  items:VoteItem[];
  newName:string;

  constructor(private voteService:VoteService) { }

  ngOnInit() {
    this.voteService.addItem("Vanilla");
    this.voteService.addItem("Chocolate");
    this.refreshList();
  }

  add() {
    this.voteService.addItem(this.newName);
    this.newName = "";
    this.refreshList();
  }

  remove(name:string) {
    this.voteService.removeItem(name);
    this.refreshList();
  }

  upvote(name:string) {
    this.voteService.upvote(name);
    this.refreshList();
  }

  downvote(name:string) {
    this.voteService.downvote(name);
    this.refreshList();
  }

  undo() {
    this.voteService.undo();
    this.refreshList();
  }

  private refreshList() {
    this.items = this.voteService.getItems();
  }

}
