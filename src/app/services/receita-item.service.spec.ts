import { TestBed } from '@angular/core/testing';

import { ReceitaItemService } from './receita-item.service';

describe('ReceitaItemService', () => {
  let service: ReceitaItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceitaItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
