import { Component, OnInit } from '@angular/core';
import { Party } from 'src/app/models/party.model';
import { PartyService } from 'src/app/services/party.service';

@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.component.html',
  styleUrls: ['./party-list.component.css']
})
export class PartyListComponent implements OnInit{
  parties: Party[] = [];
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  searchTerm = '';
  isLoading = false;

  constructor(private partyService: PartyService) { }

  ngOnInit() {
    this.loadParties();
  }

  loadParties() {
    this.isLoading = true;
    this.partyService.getParties(this.currentPage, this.pageSize, this.searchTerm)
      .subscribe({
        next: (response) => {
          this.parties = response.data || [];
          this.totalItems = response.count || this.parties.length;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading parties:', error);
          this.isLoading = false;
        }
      });
  }

  onSearch() {
    this.currentPage = 1;
    this.loadParties();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadParties();
  }

  deleteParty(id: number) {
    if (confirm('Are you sure you want to delete this party?')) {
      this.partyService.deleteParty(id).subscribe({
        next: () => {
          this.loadParties();
        },
        error: (error) => {
          console.error('Error deleting party:', error);
        }
      });
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
}
