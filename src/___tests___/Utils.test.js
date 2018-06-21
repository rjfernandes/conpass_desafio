import { formatDate, isEmailValid } from '../utils/utils'

describe('Utils', () => {
    it('Teste de formatação da data: 2018-06-20T14:03:47-03:00 (w3c) para Jun 20, 2018, 14:03 (MMM D, YYYY, HH:mm)', () => { 
        const w3cDate = '2018-06-20T14:03:47-03:00'
        expect(formatDate(w3cDate)).toEqual('Jun 20, 2018, 14:03')
    })

    it('Verificar email - Email inválido', () => { 
        expect(isEmailValid('robson.fernandes@gmail')).toBeFalsy()
    })

    it('Verificar email - Email válido', () => { 
        expect(isEmailValid('robson.fernandes@gmail.com')).toBeTruthy()
    })
})