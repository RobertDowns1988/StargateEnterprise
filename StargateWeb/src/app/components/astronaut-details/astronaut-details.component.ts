import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Astronaut } from '../../app.component';

@Component({
  selector: 'app-astronaut-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="component-card">
      <div class="component-header">
        <h2>Astronaut Details</h2>
      </div>
      
      <div class="astronaut-list">
        <div 
          *ngFor="let astronaut of astronauts" 
          class="astronaut-card"
          [class.selected]="selectedAstronaut?.id === astronaut.id"
          (click)="selectAstronaut(astronaut)">
          
          <div class="astronaut-info">
            <h3 class="astronaut-name">{{ astronaut.fullName }}</h3>
            
            <div class="detail-row">
              <span class="label">Rank:</span>
              <span class="value">{{ astronaut.rank }}</span>
            </div>
            
            <div class="detail-row">
              <span class="label">Duty Title:</span>
              <span class="value">{{ astronaut.dutyTitle }}</span>
            </div>
            
            <div class="detail-row">
              <span class="label">Career Start:</span>
              <span class="value">{{ formatDate(astronaut.careerStartDate) }}</span>
            </div>
            
            <div class="detail-row">
              <span class="label">Career End:</span>
              <span class="value" [class.active]="!astronaut.careerEndDate">
                {{ astronaut.careerEndDate ? formatDate(astronaut.careerEndDate) : 'Still Active' }}
              </span>
            </div>
          </div>
          
          <div class="click-indicator">
            <span>Click for job details →</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .component-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 16px;
      overflow: hidden;
      height: fit-content;
    }

    .component-header {
      background: rgba(255, 255, 255, 0.05);
      padding: 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .component-header h2 {
      color: #ffffff;
      margin: 0;
      font-size: 1.5rem;
      font-weight: 400;
    }

    .astronaut-list {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .astronaut-card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 1.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .astronaut-card:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(100, 200, 255, 0.5);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    }

    .astronaut-card.selected {
      background: rgba(100, 200, 255, 0.2);
      border-color: rgba(100, 200, 255, 0.6);
      box-shadow: 0 0 20px rgba(100, 200, 255, 0.3);
    }

    .astronaut-name {
      color: #ffffff;
      margin: 0 0 1rem 0;
      font-size: 1.3rem;
      font-weight: 500;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.75rem;
      align-items: center;
    }

    .detail-row:last-child {
      margin-bottom: 0;
    }

    .label {
      color: rgba(255, 255, 255, 0.7);
      font-weight: 500;
      font-size: 0.9rem;
    }

    .value {
      color: #ffffff;
      font-weight: 400;
      text-align: right;
      max-width: 60%;
    }

    .value.active {
      color: #4ade80;
      font-weight: 500;
    }

    .click-indicator {
      position: absolute;
      bottom: 0.75rem;
      right: 1rem;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .click-indicator span {
      color: rgba(100, 200, 255, 0.8);
      font-size: 0.8rem;
      font-style: italic;
    }

    .astronaut-card:hover .click-indicator {
      opacity: 1;
    }
  `]
})
export class AstronautDetailsComponent {
  @Input() astronauts: Astronaut[] = [];
  @Output() astronautSelected = new EventEmitter<Astronaut>();

  selectedAstronaut: Astronaut | null = null;

  selectAstronaut(astronaut: Astronaut) {
    this.selectedAstronaut = astronaut;
    this.astronautSelected.emit(astronaut);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
