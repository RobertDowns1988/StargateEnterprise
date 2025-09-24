import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Astronaut, JobDetail } from '../../app.component';

@Component({
  selector: 'app-astronaut-job-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="component-card">
      <div class="component-header">
        <h2>Astronaut Job Details</h2>
        <p *ngIf="selectedAstronaut" class="selected-name">{{ selectedAstronaut.fullName }}</p>
      </div>
      
      <div class="job-content">
        <div *ngIf="!selectedAstronaut" class="empty-state">
          <div class="empty-icon">🔍</div>
          <p>Select an astronaut to view their job details</p>
        </div>
        
        <div *ngIf="selectedAstronaut && getAstronautJobs().length === 0" class="empty-state">
          <div class="empty-icon">📋</div>
          <p>No job details found for {{ selectedAstronaut.fullName }}</p>
        </div>
        
        <div *ngIf="selectedAstronaut && getAstronautJobs().length > 0" class="jobs-list">
          <div *ngFor="let job of getAstronautJobs(); let i = index" class="job-card">
            <div class="job-header">
              <span class="job-number">Job #{{ i + 1 }}</span>
              <div class="job-duration">
                {{ formatDate(job.dutyStartDate) }} - 
                <span [class.active]="!job.dutyEndDate">
                  {{ job.dutyEndDate ? formatDate(job.dutyEndDate) : 'Still Active' }}
                </span>
              </div>
            </div>
            
            <div class="job-details">
              <div class="detail-row">
                <span class="label">Rank:</span>
                <span class="value rank">{{ job.rank }}</span>
              </div>
              
              <div class="detail-row">
                <span class="label">Duty Title:</span>
                <span class="value">{{ job.dutyTitle }}</span>
              </div>
              
              <div class="detail-row">
                <span class="label">Start Date:</span>
                <span class="value">{{ formatDate(job.dutyStartDate) }}</span>
              </div>
              
              <div class="detail-row">
                <span class="label">End Date:</span>
                <span class="value" [class.active]="!job.dutyEndDate">
                  {{ job.dutyEndDate ? formatDate(job.dutyEndDate) : 'Still Active' }}
                </span>
              </div>
            </div>
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

    .selected-name {
      color: rgba(100, 200, 255, 0.9);
      margin: 0.5rem 0 0 0;
      font-size: 1.1rem;
      font-weight: 500;
    }

    .job-content {
      padding: 1.5rem;
    }

    .empty-state {
      text-align: center;
      padding: 3rem 1rem;
      color: rgba(255, 255, 255, 0.6);
    }

    .empty-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .empty-state p {
      margin: 0;
      font-size: 1.1rem;
    }

    .jobs-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .job-card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .job-card:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.3);
    }

    .job-header {
      background: rgba(0, 0, 0, 0.2);
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .job-number {
      color: rgba(100, 200, 255, 0.9);
      font-weight: 600;
      font-size: 0.9rem;
    }

    .job-duration {
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.9rem;
    }

    .job-details {
      padding: 1.5rem;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      align-items: center;
    }

    .detail-row:last-child {
      margin-bottom: 0;
    }

    .label {
      color: rgba(255, 255, 255, 0.7);
      font-weight: 500;
      font-size: 0.95rem;
    }

    .value {
      color: #ffffff;
      font-weight: 400;
      text-align: right;
      max-width: 65%;
    }

    .value.rank {
      background: rgba(100, 200, 255, 0.2);
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 500;
    }

    .value.active {
      color: #4ade80;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      .job-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
      
      .detail-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
      }
      
      .value {
        text-align: left;
        max-width: 100%;
      }
    }
  `]
})
export class AstronautJobDetailsComponent {
  @Input() selectedAstronaut: Astronaut | null = null;
  @Input() jobDetails: JobDetail[] = [];

  getAstronautJobs(): JobDetail[] {
    if (!this.selectedAstronaut) return [];
    return this.jobDetails.filter(job => job.astronautId === this.selectedAstronaut!.id);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
