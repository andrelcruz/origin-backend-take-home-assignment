import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import minifaker from 'minifaker';
import * as request from 'supertest';
import { ValidationExceptionFilter } from '../../../../src/core/filters';
import { HttpResponseType } from '../../../../src/core/globals/HttpResult';
import { CustomClassValidatorValidationPipe } from '../../../../src/core/pipes/CustomClassValidatorValidationPipe';
import { CalculateRiskAssessmentRequest } from '../../../../src/modules/risk-assessment/input/request/CalculateRiskAssessmentRequest';
import { HouseOwnershipEnum, MaritalStatusEnum } from '../../../../src/modules/risk-assessment/model';
import { RiskAssessmentModule } from '../../../../src/modules/risk-assessment/RiskAssessmentModule';

describe('RiskAssessment :: RiskAssessmentController (e2e)', () => {
  let app: INestApplication
  const moduleBasePath = '/v1/risk-assessment'
  let validRequestMock: CalculateRiskAssessmentRequest

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RiskAssessmentModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    
    app.useGlobalFilters(
        new ValidationExceptionFilter()
    )
    app.useGlobalPipes(new CustomClassValidatorValidationPipe())

    await app.init()

    validRequestMock = {
        age: minifaker.number({min: 0, max: 90}),
        dependents: minifaker.number({min: 0, max: 5}),
        house: { ownership_status: HouseOwnershipEnum.OWNED },
        income: minifaker.number({min: 0, max: 500000}),
        marital_status: MaritalStatusEnum.MARRIED,
        risk_questions: [0, 1, 1],
        vehicle: { year: minifaker.number({ min: 1900, max: 2020 }) }
    }
  })
//   "age should not be null or undefined","age must be an integer number","age must not be less than 0"
  describe('Validates requestBody properties', () => {
    it('Returns a success status when using a valid request', () => {
        return request(app.getHttpServer())
            .post(moduleBasePath)
            .send(validRequestMock)
            .expect(201)
    })
    
    describe('Validates Age property requisites', () => {
        it('Returns a BAD_REQUEST status when Age is undefined', () => {
            const expectAgeToBeDefined = 'age should not be null or undefined'
            return request(app.getHttpServer())
              .post(moduleBasePath)
              .expect(400)
              .expect(body => validateErrorMessage(body, expectAgeToBeDefined))
          })
    
        it('Returns a BAD_REQUEST status when Age a negative number', () => {
            const expectedErrorMessage = 'age must not be less than 0'
            const requestBodyMock = {
                ...validRequestMock,
                age: -1
            }
    
            return request(app.getHttpServer())
              .post(moduleBasePath)
              .send(requestBodyMock)
              .expect(400)
              .expect(body => validateErrorMessage(body, expectedErrorMessage))
        })

        it('Returns a BAD_REQUEST status when Age is not a number', () => {
            const expectedErrorMessage = 'age must be an integer number'
            const requestBodyMock = {
                ...validRequestMock,
                age: 'test string'
            }
    
            return request(app.getHttpServer())
              .post(moduleBasePath)
              .send(requestBodyMock)
              .expect(400)
              .expect(body => validateErrorMessage(body, expectedErrorMessage))
        })
    })
    describe('Validates dependents property requisites', () => {
        it('Returns a BAD_REQUEST status when dependents is undefined', () => {
            const expectAgeToBeDefined = 'dependents should not be null or undefined'
            return request(app.getHttpServer())
              .post(moduleBasePath)
              .expect(400)
              .expect(body => validateErrorMessage(body, expectAgeToBeDefined))
          })
    
        it('Returns a BAD_REQUEST status when dependents a negative number', () => {
            const expectedErrorMessage = 'dependents must not be less than 0'
            const requestBodyMock = {
                ...validRequestMock,
                dependents: -1
            }
    
            return request(app.getHttpServer())
              .post(moduleBasePath)
              .send(requestBodyMock)
              .expect(400)
              .expect(body => validateErrorMessage(body, expectedErrorMessage))
        })
    })

    describe('Validates income property requisites', () => {
        it('Returns a BAD_REQUEST status when income is undefined', () => {
            const expectAgeToBeDefined = 'income should not be null or undefined'
            return request(app.getHttpServer())
              .post(moduleBasePath)
              .expect(400)
              .expect(body => validateErrorMessage(body, expectAgeToBeDefined))
        })
    
        it('Returns a BAD_REQUEST status when income a negative number', () => {
            const expectedErrorMessage = 'income must not be less than 0'
            const requestBodyMock = {
                ...validRequestMock,
                income: -1
            }
    
            return request(app.getHttpServer())
              .post(moduleBasePath)
              .send(requestBodyMock)
              .expect(400)
              .expect(body => validateErrorMessage(body, expectedErrorMessage))
        })
    })
    describe('Validates marital_status property requisites', () => {
        it('Returns a BAD_REQUEST status when marital_status is undefined', () => {
            const expectAgeToBeDefined = 'marital_status should not be null or undefined'
            return request(app.getHttpServer())
              .post(moduleBasePath)
              .expect(400)
              .expect(body => validateErrorMessage(body, expectAgeToBeDefined))
          })
    
        it('Returns a BAD_REQUEST status when marital_status is not a valid enum value', () => {
            const expectedErrorMessage = 'marital_status must be a valid enum value'
            const requestBodyMock = {
                ...validRequestMock,
                marital_status: 'test string'
            }
    
            return request(app.getHttpServer())
              .post(moduleBasePath)
              .send(requestBodyMock)
              .expect(400)
              .expect(body => validateErrorMessage(body, expectedErrorMessage))
        })
    })

    describe('Validates risk_questions property requisites', () => {
        it('Returns a BAD_REQUEST status when risk_questions is undefined', () => {
            const expectAgeToBeDefined = 'risk_questions should not be null or undefined'
            return request(app.getHttpServer())
              .post(moduleBasePath)
              .expect(400)
              .expect(body => validateErrorMessage(body, expectAgeToBeDefined))
          })
    
        it('Returns a BAD_REQUEST status when risk_questions length is lesser than expected', () => {
            const expectedErrorMessage = 'risk_questions must contain at least 3 elements'
            const requestBodyMock = {
                ...validRequestMock,
                risk_questions: [1]
            }
    
            return request(app.getHttpServer())
              .post(moduleBasePath)
              .send(requestBodyMock)
              .expect(400)
              .expect(body => validateErrorMessage(body, expectedErrorMessage))
        })

        it('Returns a BAD_REQUEST status when risk_questions length is greater than expected', () => {
            const expectedErrorMessage = 'risk_questions must contain not more than 3 elements'
            const requestBodyMock = {
                ...validRequestMock,
                risk_questions: [1, 0, 1, 0]
            }
    
            return request(app.getHttpServer())
              .post(moduleBasePath)
              .send(requestBodyMock)
              .expect(400)
              .expect(body => validateErrorMessage(body, expectedErrorMessage))
        })

        it('Returns a BAD_REQUEST status when risk_questions contains invalid values', () => {
            const expectedErrorMessage = 'each value in risk_questions must not be greater than 1'
            const requestBodyMock = {
                ...validRequestMock,
                risk_questions: [1, 5, 1]
            }
    
            return request(app.getHttpServer())
              .post(moduleBasePath)
              .send(requestBodyMock)
              .expect(400)
              .expect(body => validateErrorMessage(body, expectedErrorMessage))
        })
    })
  })

  function validateErrorMessage (responseBody: HttpResponseType, expectedMessage: string): boolean {
      return responseBody.errors && responseBody.errors.indexOf(expectedMessage) >= 0
  }
})
