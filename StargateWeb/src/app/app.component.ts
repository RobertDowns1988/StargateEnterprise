import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstronautDetailsComponent } from './components/astronaut-details/astronaut-details.component';
import { AstronautJobDetailsComponent } from './components/astronaut-job-details/astronaut-job-details.component';

export interface Astronaut {
  id: number;
  fullName: string;
  rank: string;
  dutyTitle: string;
  careerStartDate: string;
  careerEndDate?: string;
}

export interface JobDetail {
  id: number;
  astronautId: number;
  rank: string;
  dutyTitle: string;
  dutyStartDate: string;
  dutyEndDate?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AstronautDetailsComponent, AstronautJobDetailsComponent],
  template: `
    <div class="dashboard-container">
      <header class="dashboard-header">
        <h1>Astronaut Career Tracking System</h1>
      </header>
      
      <div class="dashboard-content">
        <div class="components-container">
          <app-astronaut-details 
            [astronauts]="astronauts"
            (astronautSelected)="onAstronautSelected($event)">
          </app-astronaut-details>
          
          <app-astronaut-job-details 
            [selectedAstronaut]="selectedAstronaut"
            [jobDetails]="jobDetails">
          </app-astronaut-job-details>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .dashboard-header {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding: 1.5rem 2rem;
      text-align: center;
    }

    .dashboard-header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 2rem;
      font-weight: 300;
      letter-spacing: 1px;
    }

    .dashboard-content {
      padding: 2rem;
    }

    .components-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    @media (max-width: 968px) {
      .components-container {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AppComponent {
  selectedAstronaut: Astronaut | null = null;

  astronauts: Astronaut[] = [
    {
      id: 1,
      fullName: "Neil Armstrong",
      rank: "Commander",
      dutyTitle: "Mission Commander",
      careerStartDate: "1962-09-17",
      careerEndDate: "1971-08-01"
    },
    {
      id: 2,
      fullName: "Buzz Aldrin",
      rank: "Colonel",
      dutyTitle: "Lunar Module Pilot",
      careerStartDate: "1963-10-17",
      careerEndDate: "1971-07-01"
    },
    {
      id: 3,
      fullName: "Sally Ride",
      rank: "Mission Specialist",
      dutyTitle: "Payload Specialist",
      careerStartDate: "1978-01-16"
    },
    {
      id: 4,
      fullName: "Chris Hadfield",
      rank: "Colonel",
      dutyTitle: "ISS Commander",
      careerStartDate: "1992-06-25",
      careerEndDate: "2013-07-03"
    }
  ];

  jobDetails: JobDetail[] = [
    {
      id: 1,
      astronautId: 1,
      rank: "Test Pilot",
      dutyTitle: "X-15 Test Pilot",
      dutyStartDate: "1962-09-17",
      dutyEndDate: "1966-07-20"
    },
    {
      id: 2,
      astronautId: 1,
      rank: "Commander",
      dutyTitle: "Apollo 11 Mission Commander",
      dutyStartDate: "1966-07-21",
      dutyEndDate: "1969-07-24"
    },
    {
      id: 3,
      astronautId: 1,
      rank: "Commander",
      dutyTitle: "Backup Commander Gemini 11",
      dutyStartDate: "1969-07-25",
      dutyEndDate: "1971-08-01"
    },
    {
      id: 4,
      astronautId: 2,
      rank: "Pilot",
      dutyTitle: "Gemini 12 Pilot",
      dutyStartDate: "1963-10-17",
      dutyEndDate: "1966-11-15"
    },
    {
      id: 5,
      astronautId: 2,
      rank: "Colonel",
      dutyTitle: "Apollo 11 Lunar Module Pilot",
      dutyStartDate: "1966-11-16",
      dutyEndDate: "1971-07-01"
    },
    {
      id: 6,
      astronautId: 3,
      rank: "Mission Specialist",
      dutyTitle: "STS-7 Mission Specialist",
      dutyStartDate: "1978-01-16",
      dutyEndDate: "1983-06-24"
    },
    {
      id: 7,
      astronautId: 3,
      rank: "Mission Specialist",
      dutyTitle: "STS-41-G Mission Specialist",
      dutyStartDate: "1983-06-25"
    },
    {
      id: 8,
      astronautId: 4,
      rank: "Mission Specialist",
      dutyTitle: "STS-74 Mission Specialist",
      dutyStartDate: "1992-06-25",
      dutyEndDate: "1995-11-20"
    },
    {
      id: 9,
      astronautId: 4,
      rank: "Commander",
      dutyTitle: "ISS Expedition 35 Commander",
      dutyStartDate: "1995-11-21",
      dutyEndDate: "2013-07-03"
    }
  ];

  onAstronautSelected(astronaut: Astronaut) {
    this.selectedAstronaut = astronaut;
  }
}
