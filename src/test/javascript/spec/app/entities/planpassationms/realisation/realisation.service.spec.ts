import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { RealisationService } from 'app/entities/planpassationms/realisation/realisation.service';
import { IRealisation, Realisation } from 'app/shared/model/planpassationms/realisation.model';

describe('Service Tests', () => {
  describe('Realisation Service', () => {
    let injector: TestBed;
    let service: RealisationService;
    let httpMock: HttpTestingController;
    let elemDefault: IRealisation;
    let expectedResult: IRealisation | IRealisation[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(RealisationService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Realisation(0, 'AAAAAAA', currentDate, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateAttribution: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Realisation', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateAttribution: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateAttribution: currentDate,
          },
          returnedFromService
        );

        service.create(new Realisation()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Realisation', () => {
        const returnedFromService = Object.assign(
          {
            libelle: 'BBBBBB',
            dateAttribution: currentDate.format(DATE_FORMAT),
            delaiexecution: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateAttribution: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Realisation', () => {
        const returnedFromService = Object.assign(
          {
            libelle: 'BBBBBB',
            dateAttribution: currentDate.format(DATE_FORMAT),
            delaiexecution: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateAttribution: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Realisation', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
