import { TestBed } from '@angular/core/testing';

import { LocalNiChatService } from './local-ni-chat.service';

describe('LocalNiChatService', () => {
  let service: LocalNiChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalNiChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
