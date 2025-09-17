import Mock, { Random } from 'mockjs'
import setupMock, { successResponseWrap } from '@/utils/setup-mock'

// import { MockParams } from '@/types/mock'

setupMock({
  setup() {
    // 初诊列表
    Mock.mock(new RegExp('/outp-api/outpD/reg-info/getFirstClinicPatList'), () => {
      const mock = Mock.mock({
        'array|1-20': [
          {
            name: () => Random.cname(),
            queueName: () => Random.ctitle(),
            registerDept: '',
            queueSequence: 0,
            registerDate: '',
            patientId: () => Random.guid(),
            sex: '',
            chargeType: '',
            clinicType: '',
            visitDate: Random.date(),
            visitNo: 0,
            'serialNo|+1': 1,
            visitDept: () => Random.ctitle(3, 5),
            deptName: () => Random.ctitle(3, 5),
            counselNo: '',
            workedIndicator: 0,
            doctor: () => Random.ctitle(3, 5),
            doctorNo: ''
          }
        ]
      })
      return successResponseWrap(mock.array)
    })
    Mock.mock(new RegExp('/outp-api/outpD/pat-info/getPatInfoByPatientId1'), () => {
      const mock = Mock.mock({
        'array|1-20': [
          {
            patientId: () => Random.integer(10000000, 20000000).toString(),
            inpNo: () => Random.integer(1000, 5000).toString(),
            name: () => Random.cname(),
            namePhonetic: '',
            'sex|1': ['男', '女'],
            dateOfBirth: '', // 出生日期
            birthPlace: '',
            citizenship: '',
            nation: '',
            idNo: '',
            identity: '',
            chargeType: '自费', // 费别
            unitInContract: '',
            mailingAddress: '',
            zipCode: '',
            phoneNumberHome: '',
            phoneNumberBusiness: '',
            nextOfKin: '',
            relationship: '',
            nextOfKinAddr: '',
            nextOfKinZipCode: '',
            nextOfKinPhone: '',
            lastVisitDate: '',
            vipIndicator: 0,
            createDate: '',
            operator: '',
            serviceAgency: '',
            idType: '',
            alergyDrugs: '',
            nativePlace: '',
            mailingAddressCode: '',
            healthyCardNo: '',
            insuranceNoTj: '',
            medicalCardNo: ''
          }
        ]
      })
      return successResponseWrap(mock.array)
    })
  }
})
