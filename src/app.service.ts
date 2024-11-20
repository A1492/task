import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { google } from 'googleapis';

@Injectable()
export class AppService {
  private readonly apiUrl = 'http://94.103.91.4:5000'; 
  private token: string;

  async registerUser(username: string): Promise<void> {
      const response = await axios.post(`${this.apiUrl}/auth/registration`, { username });
      return response.data.token
    }

  async loginUser(username: string): Promise<void> {
      const response = await axios.post(`${this.apiUrl}/auth/login`, { username });
      this.token = response.data.token;
      return response.data.token
  }

  async exportToGoogleSheet(): Promise<void> {
    const response = await axios.get(`${this.apiUrl}/clients`, {
      headers: { Authorization: this.token }
    });

    const clients = response.data

      const auth = new google.auth.GoogleAuth({
        keyFile: 'A:/OneDrive/Desktop/2/project/src/prime-keel-442313-e8-50badbff46c6.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const sheets = google.sheets({ version: 'v4', auth });
      const spreadsheetId = '1XGfhAtmrxhi0dbX8rCgpLOjqzwlI2weshGCxFFNSvqE';

      const values = [
        ['ID', 'First Name', 'Last Name', 'Gender', 'Address', 'City', 'Phone', 'Email'],
        ...clients.map((client) => [
          client.id,
          client.firstName,
          client.lastName,
          client.gender,
          client.address,
          client.city,
          client.phone,
          client.email,
        ]),
      ];

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Test1',
        valueInputOption: 'RAW',
        requestBody: { values },
      });


  }
}