import { Injectable } from '@angular/core';
import {Bot} from '../models/bot.model';
import {Answer} from '../models/answer.model';
import {Question} from '../models/question.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalNiChatService {

  private static readonly CATEGORIES = [
    'special',
    'not so special'
  ];

  private static readonly BOTS: Bot[] = [
    {
      id: 'gpt3',
      name: 'GPT3',
      category: 'special'
    },
    {
      id: 'astra',
      name: 'Astra',
      category: 'not so special'
    }
  ];

  private static readonly ANSWERS: Answer[] = [
    {
      botId: 'gpt3',
      text: 'Totally!'
    },
    {
      botId: 'astra',
      text: 'Ok dude!'
    },
    {
      botId: 'gpt3',
      text: 'Not right now!'
    },
    {
      botId: 'astra',
      text: 'Sure'
    }
  ]

  constructor() { }

  getCategories(): Observable<string[]> {
    return this.buildObservable(LocalNiChatService.CATEGORIES);
  }

  getBots(category?: string): Observable<Bot[]> {
    return this.buildObservable(LocalNiChatService.BOTS.filter(bot => !category || bot.category === category));
  }

  askQuestion(question: Question): Observable<Answer> {
    const randomIndex = this.getRandomNumber(LocalNiChatService.ANSWERS.length);
    return this.buildObservable(LocalNiChatService.ANSWERS[randomIndex]);
  }

  private getRandomNumber(upperBound: number): number {
    return Math.floor(Math.random() * upperBound);
  }

  private buildObservable(data: any): Observable<any> {
    return new Observable<Bot[]>(subscriber => {
      subscriber.next(data);
      subscriber.complete();
    })
  }
}
