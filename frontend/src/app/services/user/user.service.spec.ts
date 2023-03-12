import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { JwtModule } from '@auth0/angular-jwt';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => ''
          },
        })
      ]
    }).compileComponents();
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
