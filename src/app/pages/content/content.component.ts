import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { dataFake } from '../../data/dataFake';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
})
export class ContentComponent {
  private id: string | null = '';

  @Input()
  photoCover: string = '';

  @Input()
  contentTitle: string = '';

  @Input()
  contentDescription: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      // Fetch content based on the id if needed
      console.log('Content ID:', this.id);
    });

    if (this.id !== null) {
      this.setValuesToComponent(this.id);
    }
  }

  setValuesToComponent(id: string | null) {
    const result = dataFake.filter((item) => item.id.toString() === id);
    if (result.length > 0) {
      for (const item of result) {
        this.photoCover = item.photoCover;
        this.contentTitle = item.contentTitle;
        this.contentDescription = item.contentDescription;
      }
    } else {
      console.error('Content not found for ID:', id);
    }
  }
}
