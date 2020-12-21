import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { PlanPassationService } from 'app/entities/planpassationms/plan-passation/plan-passation.service';
import { IPlanPassation, PlanPassation } from 'app/shared/model/planpassationms/plan-passation.model';

describe('Service Tests', () => {
  describe('PlanPassation Service', () => {
    let injector: TestBed;
    let service: PlanPassationService;
    let httpMock: HttpTestingController;
    let elemDefault: IPlanPassation;
    let expectedResult: IPlanPassation | IPlanPassation[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(PlanPassationService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new PlanPassation(
        0,
        currentDate,
        currentDate,
        'AAAAAAA',
        0,
        currentDate,
        currentDate,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        currentDate,
        'image/png',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        currentDate,
        currentDate,
        currentDate,
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateDebut: currentDate.format(DATE_FORMAT),
            dateFin: currentDate.format(DATE_FORMAT),
            dateCreation: currentDate.format(DATE_FORMAT),
            dateMiseValidation: currentDate.format(DATE_FORMAT),
            dateValidation: currentDate.format(DATE_FORMAT),
            dateMiseEnValidationCcmp: currentDate.format(DATE_FORMAT),
            dateValidation1: currentDate.format(DATE_FORMAT),
            dateValidation2: currentDate.format(DATE_FORMAT),
            dateRejet: currentDate.format(DATE_FORMAT),
            datePublication: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a PlanPassation', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateDebut: currentDate.format(DATE_FORMAT),
            dateFin: currentDate.format(DATE_FORMAT),
            dateCreation: currentDate.format(DATE_FORMAT),
            dateMiseValidation: currentDate.format(DATE_FORMAT),
            dateValidation: currentDate.format(DATE_FORMAT),
            dateMiseEnValidationCcmp: currentDate.format(DATE_FORMAT),
            dateValidation1: currentDate.format(DATE_FORMAT),
            dateValidation2: currentDate.format(DATE_FORMAT),
            dateRejet: currentDate.format(DATE_FORMAT),
            datePublication: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateDebut: currentDate,
            dateFin: currentDate,
            dateCreation: currentDate,
            dateMiseValidation: currentDate,
            dateValidation: currentDate,
            dateMiseEnValidationCcmp: currentDate,
            dateValidation1: currentDate,
            dateValidation2: currentDate,
            dateRejet: currentDate,
            datePublication: currentDate,
          },
          returnedFromService
        );

        service.create(new PlanPassation()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a PlanPassation', () => {
        const returnedFromService = Object.assign(
          {
            dateDebut: currentDate.format(DATE_FORMAT),
            dateFin: currentDate.format(DATE_FORMAT),
            commentaire: 'BBBBBB',
            annee: 1,
            dateCreation: currentDate.format(DATE_FORMAT),
            dateMiseValidation: currentDate.format(DATE_FORMAT),
            dateValidation: currentDate.format(DATE_FORMAT),
            statut: 'BBBBBB',
            commentaireMiseEnValidationAC: 'BBBBBB',
            referenceMiseValidationAC: 'BBBBBB',
            fichierMiseValidationAC: 'BBBBBB',
            dateMiseEnValidationCcmp: currentDate.format(DATE_FORMAT),
            fichierMiseValidationCcmp: 'BBBBBB',
            referenceMiseValidationCcmp: 'BBBBBB',
            dateValidation1: currentDate.format(DATE_FORMAT),
            commentaireValidation: 'BBBBBB',
            referenceValidation: 'BBBBBB',
            fichierValidation: 'BBBBBB',
            dateValidation2: currentDate.format(DATE_FORMAT),
            dateRejet: currentDate.format(DATE_FORMAT),
            datePublication: currentDate.format(DATE_FORMAT),
            commentairePublication: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateDebut: currentDate,
            dateFin: currentDate,
            dateCreation: currentDate,
            dateMiseValidation: currentDate,
            dateValidation: currentDate,
            dateMiseEnValidationCcmp: currentDate,
            dateValidation1: currentDate,
            dateValidation2: currentDate,
            dateRejet: currentDate,
            datePublication: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of PlanPassation', () => {
        const returnedFromService = Object.assign(
          {
            dateDebut: currentDate.format(DATE_FORMAT),
            dateFin: currentDate.format(DATE_FORMAT),
            commentaire: 'BBBBBB',
            annee: 1,
            dateCreation: currentDate.format(DATE_FORMAT),
            dateMiseValidation: currentDate.format(DATE_FORMAT),
            dateValidation: currentDate.format(DATE_FORMAT),
            statut: 'BBBBBB',
            commentaireMiseEnValidationAC: 'BBBBBB',
            referenceMiseValidationAC: 'BBBBBB',
            fichierMiseValidationAC: 'BBBBBB',
            dateMiseEnValidationCcmp: currentDate.format(DATE_FORMAT),
            fichierMiseValidationCcmp: 'BBBBBB',
            referenceMiseValidationCcmp: 'BBBBBB',
            dateValidation1: currentDate.format(DATE_FORMAT),
            commentaireValidation: 'BBBBBB',
            referenceValidation: 'BBBBBB',
            fichierValidation: 'BBBBBB',
            dateValidation2: currentDate.format(DATE_FORMAT),
            dateRejet: currentDate.format(DATE_FORMAT),
            datePublication: currentDate.format(DATE_FORMAT),
            commentairePublication: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateDebut: currentDate,
            dateFin: currentDate,
            dateCreation: currentDate,
            dateMiseValidation: currentDate,
            dateValidation: currentDate,
            dateMiseEnValidationCcmp: currentDate,
            dateValidation1: currentDate,
            dateValidation2: currentDate,
            dateRejet: currentDate,
            datePublication: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a PlanPassation', () => {
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
