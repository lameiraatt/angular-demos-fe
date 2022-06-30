import { TestBed } from '@angular/core/testing';

import { NiChatService } from './ni-chat.service';

describe('NiChatService', () => {
  let service: NiChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NiChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
