export const onload = async () => {
    try {
        //button div banks
        const bankList = createBankList()
        console.log(bankList)
        readBankList(bankList)

        //available information in the SBIF API since 2008
        const selectYear = document.getElementById('selectYear')
        //selectYear.innerHTML = `<option value='2022' selected>2022</option>`

        for (let i = 2022; i >= 2008; i--) {

            selectYear.innerHTML+= `<option value="${i}">${i}</option>`
        }
        return bankList
    } catch (error) {

    }
}

function createBankList() {
    const banksList = [
        { CodigoInstitucion: '001', NombreInstitucion: 'BANCO DE CHILE' },
        { CodigoInstitucion: '009', NombreInstitucion: 'BANCO INTERNACIONAL' },
        { CodigoInstitucion: '012', NombreInstitucion: 'BANCO DEL ESTADO DE CHILE' },
        { CodigoInstitucion: '014', NombreInstitucion: 'SCOTIABANK CHILE' },
        { CodigoInstitucion: '016', NombreInstitucion: 'BANCO DE CRÉDITO E INVERSIONES' },
        { CodigoInstitucion: '028', NombreInstitucion: 'BANCO BICE' },
        { CodigoInstitucion: '031', NombreInstitucion: 'HSBC BANK CHILE' },
        { CodigoInstitucion: '037', NombreInstitucion: 'BANCO SANTANDER-CHILE' },
        { CodigoInstitucion: '039', NombreInstitucion: 'ITAÚ CORPBANCA' },
        { CodigoInstitucion: '041', NombreInstitucion: 'JP MORGAN CHASE BANK' },
        { CodigoInstitucion: '049', NombreInstitucion: 'BANCO SECURITY' },
        { CodigoInstitucion: '051', NombreInstitucion: 'BANCO FALABELLA' },
        { CodigoInstitucion: '053', NombreInstitucion: 'BANCO RIPLEY' },
        { CodigoInstitucion: '055', NombreInstitucion: 'BANCO CONSORCIO' },
        { CodigoInstitucion: '059', NombreInstitucion: 'BANCO BTG PACTUAL CHILE' },
        { CodigoInstitucion: '060', NombreInstitucion: 'CHINA CONSTRUCTION BANK' },
        { CodigoInstitucion: '061', NombreInstitucion: 'BANK OF CHINA, AGENCIA EN CHILE' },
    ];
    return banksList
}

function readBankList(bankList) {
    let style = "col-lg-3 col-md-4 col-sm-6 col-xs-12 d-flex align-items-center justify-content-center h-10 border border-primary bg-secondary-subtle cursor-pointer"
    const banks = document.getElementById("banks")

    bankList.forEach(elemento => {
        banks.innerHTML += `
        <div class='${style}' id='${elemento.CodigoInstitucion}'>${elemento.NombreInstitucion}</div>`
    })
}

