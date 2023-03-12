import { TestBed } from '@angular/core/testing';
import { JwtModule } from '@auth0/angular-jwt';

import { LoginGuardService } from './login-guard.service';

describe('LoginGuardService', () => {
  let service: LoginGuardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        JwtModule.forRoot({
          config: {
            tokenGetter: () => ''
          },
        })
      ],
    }).compileComponents();
    service = TestBed.inject(LoginGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
