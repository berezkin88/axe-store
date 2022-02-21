import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  url = '/v1/payments/instant-sepa-credit-transfers';
  options = {
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      'PSU-ID': 'user1',
      'TPP-Redirect-URI': 'http://localhost:4200',
      'TPP-Nok-Redirect-URI': 'http://localhost:8080',
      'psu-ip-address': '1.1.1.1',
      'x-request-id': uuidv4()
    }
  };

  body = {
    endToEndIdentification: 'WBG-123456789',
    debtorAccount: {
      currency: 'EUR',
      iban: 'DE74908215670000000101'
    },
    instructedAmount: {
      currency: 'EUR',
      amount: '0.01'
    },
    creditorAccount: {
      currency: 'EUR',
      iban: 'DE04908215670000000100'
    },
    creditorAgent: 'AAAADEBBXXX',
    creditorName: 'Frog',
    creditorAddress: {
      buildingNumber: '11',
      townName: 'Berlin',
      country: 'DE',
      postCode: '10001',
      streetName: 'Straße'
    },
    remittanceInformationUnstructured: 'Remittance String'
  };

  constructor(private http: HttpClient) { }

  buyAxe(): void {
    this.http.post(this.url, this.body, this.options)
      .subscribe(response => console.log(response));

    console.log('Axe bought');
  }
}
