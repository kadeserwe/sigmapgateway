import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { HistoriqueService } from 'app/entities/planpassationms/historique/historique.service';
import { IHistorique, Historique } from 'app/shared/model/planpassationms/historique.model';

describe('Service Tests', () => {
  describe('Historique Service', () => {
    let injector: TestBed;
    let service: HistoriqueService;
    let httpMock: HttpTestingController;
    let elemDefault: IHistorique;
    let expectedResult: IHistorique | IHistorique[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(HistoriqueService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Historique(
        0,
        currentDate,
        currentDate,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'image/png',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateRejet: currentDate.format(DATE_FORMAT),
            dateRjet2: currentDate.format(DATE_FORMAT),
            dateMiseValidation: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Historique', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateRejet: currentDate.format(DATE_FORMAT),
            dateRjet2: currentDate.format(DATE_FORMAT),
            dateMiseValidation: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateRejet: currentDate,
            dateRjet2: currentDate,
            dateMiseValidation: currentDate,
          },
          returnedFromService
        );

        service.create(new Historique()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Historique', () => {
        const returnedFromService = Object.assign(
          {
            dateRejet: currentDate.format(DATE_FORMAT),
            dateRjet2: currentDate.format(DATE_FORMAT),
            dateMiseValidation: currentDate.format(DATE_FORMAT),
            commentaireRejet: 'BBBBBB',
            commentaireMiseValidation: 'BBBBBB',
            fichierMiseValidation: 'BBBBBB',
            fichierRejet: 'BBBBBB',
            etat: 'BBBBBB',
            etat2: 'BBBBBB',
            commentaireRejet2: 'BBBBBB',
            fichierRejet2: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateRejet: currentDate,
            dateRjet2: currentDate,
            dateMiseValidation: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Historique', () => {
        const returnedFromService = Object.assign(
          {
            dateRejet: currentDate.format(DATE_FORMAT),
            dateRjet2: currentDate.format(DATE_FORMAT),
            dateMiseValidation: currentDate.format(DATE_FORMAT),
            commentaireRejet: 'BBBBBB',
            commentaireMiseValidation: 'BBBBBB',
            fichierMiseValidation: 'BBBBBB',
            fichierRejet: 'BBBBBB',
            etat: 'BBBBBB',
            etat2: 'BBBBBB',
            commentaireRejet2: 'BBBBBB',
            fichierRejet2: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateRejet: currentDate,
            dateRjet2: currentDate,
            dateMiseValidation: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Historique', () => {
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
