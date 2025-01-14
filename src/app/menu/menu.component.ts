import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  showAddFournisseurForm: boolean = false;
  showAddApiForm: boolean = false;
  showAddPatindaForm: boolean = false;

  optionsMap: Map<string, string[]> = new Map([
    ['CNSS', ['API Déclaration des Salariés', 'API Consultation des Droits','API Validation des Soins Médicaux','API Calcul des Droits à la Retraite','API Demande Allocations Familiales','Portail CNSS Dédié']],
    ['CNAM', ['API pour les Droits à Assurance Maladie', 'API pour les Indemnités Journalières']],
    ['CNRPS', ['API Suivi des Cotisations']],
    ['ONFP', ['API Offres de Formation', 'API Suivi des inscriptions ']],
    ['ONAS', ['API Gestion des Factures', 'API Gestion des Factures']],
  ]);

  secondOptions: string[] = [];

  fournisseur = { name: '', type: '' };
  api = { name: '', description: '', endpoint: '', provider: '' };
  patinda = { name: '', code: '' };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getData();
  }

  onFirstSelectChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.secondOptions = this.optionsMap.get(selectedValue) || [];
  }

  toggleAddFournisseurForm() {
    this.hideAllForms();
    this.showAddFournisseurForm = !this.showAddFournisseurForm;
  }

  toggleAddApiForm() {
    this.hideAllForms();
    this.showAddApiForm = !this.showAddApiForm;
  }

  onSecondSelectChange(event: Event) {
    this.showAddPatindaForm = true;
  }

  onSubmitFournisseur() {
    this.http.post('http://127.0.0.1:5000/print_fournisseurs ', this.fournisseur).subscribe(response => {
      console.log('Fournisseur ajouté:', response);
    });
    this.showAddFournisseurForm = false; // Ferme le formulaire après la soumission
  }

  onSubmitApi() {
    this.http.post('http://127.0.0.1:5000/print_apis', this.api).subscribe(response => {
      console.log('API ajoutée:', response);
    });
    this.showAddApiForm = false; // Ferme le formulaire après la soumission
  }

  onSubmitPatinda() {
    this.http.post('http://localhost:5000/api/patinda', this.patinda).subscribe(response => {
      console.log('Patinda ajoutée:', response);
    });
    this.showAddPatindaForm = false; // Ferme le formulaire après la soumission
  }

  onCancel() {
    this.hideAllForms(); // Ferme tous les formulaires sur annulation
  }

  hideAllForms() {
    this.showAddFournisseurForm = false;
    this.showAddApiForm = false;
    this.showAddPatindaForm = false;
  }

  getData() {
    this.http.get('http://localhost:5000/api/data').subscribe(response => {
      console.log(response);
    });
  }

  postData() {
    const data = { key: 'value' };
    this.http.post('http://localhost:5000/api/data', data).subscribe(response => {
      console.log(response);
    });
  }
}
