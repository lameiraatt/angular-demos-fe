import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Bot} from './models/bot.model';
import {debounceTime, filter, Subject, Subscription} from 'rxjs';
import {LocalNiChatService} from './services/local-ni-chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  answerText: string = '';
  categories: string[] = [];
  bots: Bot[] = [];
  errorMessage: string = '';

  @ViewChild('selectedCategory') selectedCategory?: ElementRef;
  @ViewChild('selectedBot') selectedBot?: ElementRef;

  private getCategoriesSubscription?: Subscription;
  private getBotsSubscription?: Subscription;
  private askQuestionSubscription?: Subscription;

  private questionSubject: Subject<string> = new Subject<string>();

  constructor(private chatService: LocalNiChatService) {
  }

  ngOnInit() {
    this.getCategoriesSubscription = this.chatService.getCategories().subscribe(value => this.categories = value);
    this.loadBots('');

    this.questionSubject.pipe(
      filter(value => value.trim() !== ''),
      debounceTime(1000)
    ).subscribe(value => this.askQuestion(value));
  }

  ngOnDestroy() {
    this.getCategoriesSubscription?.unsubscribe();
    this.getBotsSubscription?.unsubscribe();
    this.askQuestionSubscription?.unsubscribe();
  }

  askQuestion(questionText: string): void {
    this.askQuestionSubscription?.unsubscribe();

    const category = this.selectedCategory?.nativeElement.value;
    const bot = this.selectedBot?.nativeElement.value;
    const question = {
      text: questionText,
      ...(category && {category: category}),
      ...(bot && {forBot: bot})
    }

    this.askQuestionSubscription = this.chatService.askQuestion(question)
      .subscribe({
        next: value => this.answerText = value.text,
        error: error => {
          console.log(error);
          this.errorMessage = error.message;
        }
      });
  }

  loadBots(category?: string): void {
    this.getBotsSubscription = this.chatService.getBots(category).subscribe(value => this.bots = value);
  }

  changeQuestion(questionText: string): void {
    this.questionSubject.next(questionText);
  }
}
