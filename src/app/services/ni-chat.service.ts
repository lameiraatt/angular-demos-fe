import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {Bot} from '../models/bot.model';
import {Question} from '../models/question.model';
import {Answer} from '../models/answer.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NiChatService {

  private static readonly CATEGORIES_PATH = '/categories';
  private static readonly BOTS_PATH = '/bots';
  private static readonly QUESTIONS_PATH = '/questions';

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<string[]> {
    const endpointUrl = this.buildUrl(NiChatService.CATEGORIES_PATH);
    return this.httpClient.get<string[]>(endpointUrl);
  }

  getBots(category?: string): Observable<Bot[]> {
    const endpointUrl = this.buildUrl(NiChatService.BOTS_PATH);
    let options = category ? new HttpParams().set('category', category) : {}
    return this.httpClient.get<Bot[]>(endpointUrl, options);
  }

  askQuestion(question: Question): Observable<Answer> {
    const endpointUrl = this.buildUrl(NiChatService.QUESTIONS_PATH);
    return this.httpClient.post<Answer>(endpointUrl, question).pipe(
      catchError(this.handleError)
    );
  }

  private buildUrl(path: string): string {
    return environment.chatBaseUrl + path;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    throw new Error("Oops something went wrong. Please try again later!");
  }
}
