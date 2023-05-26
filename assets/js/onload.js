export const onload = async () => {
  try {
    //button div banks
    const bankList = createBankList();
    readBankList(bankList);

    //available information in the SBIF API since 2008
    const selectYear = document.getElementById("selectYear");
    //selectYear.innerHTML = `<option value='2022' selected>2022</option>`

    for (let i = 2022; i >= 2008; i--) {
      selectYear.innerHTML += `<option value="${i}">${i}</option>`;
    }

    return bankList;
  } catch (error) {
    console.log(error);
  }
};

function createBankList() {
  const banksList = [
    {
      CodigoInstitucion: "001",
      NombreInstitucion: "BANCO DE CHILE",
      Anio: 2008,
    },
    {
      CodigoInstitucion: "009",
      NombreInstitucion: "BANCO INTERNACIONAL",
      Anio: 2008,
    },
    {
      CodigoInstitucion: "012",
      NombreInstitucion: "BANCO DEL ESTADO DE CHILE",
      Anio: 2008,
    },
    {
      CodigoInstitucion: "014",
      NombreInstitucion: "SCOTIABANK CHILE",
      Anio: 2008,
    },
    {
      CodigoInstitucion: "016",
      NombreInstitucion: "BANCO DE CRÉDITO E INVERSIONES",
      Anio: 2008,
    },
    { CodigoInstitucion: "028", NombreInstitucion: "BANCO BICE", Anio: 2008 },
    {
      CodigoInstitucion: "031",
      NombreInstitucion: "HSBC BANK CHILE",
      Anio: 2008,
    },
    {
      CodigoInstitucion: "037",
      NombreInstitucion: "BANCO SANTANDER-CHILE",
      Anio: 2008,
    },
    {
      CodigoInstitucion: "039",
      NombreInstitucion: "ITAÚ CORPBANCA",
      Anio: 2008,
    },
    {
      CodigoInstitucion: "041",
      NombreInstitucion: "JP MORGAN CHASE BANK",
      Anio: 2008,
    },
    {
      CodigoInstitucion: "049",
      NombreInstitucion: "BANCO SECURITY",
      Anio: 2008,
    },
    {
      CodigoInstitucion: "051",
      NombreInstitucion: "BANCO FALABELLA",
      Anio: 2008,
    },
    { CodigoInstitucion: "053", NombreInstitucion: "BANCO RIPLEY", Anio: 2008 },
    {
      CodigoInstitucion: "055",
      NombreInstitucion: "BANCO CONSORCIO",
      Anio: 2008,
    },
    {
      CodigoInstitucion: "059",
      NombreInstitucion: "BANCO BTG PACTUAL CHILE",
      Anio: 2015,
    },
    {
      CodigoInstitucion: "060",
      NombreInstitucion: "CHINA CONSTRUCTION BANK",
      Anio: 2017,
    },
    {
      CodigoInstitucion: "061",
      NombreInstitucion: "BANK OF CHINA, AGENCIA EN CHILE",
      Anio: 2019,
    },
  ];

  saveDataLS(banksList);
  console.log("antes");
  return banksList;
}

function readBankList(bankList) {
  let style =
    "col-lg-3 col-md-4 col-sm-6 col-xs-12 d-flex align-items-center justify-content-center h-10 border border-primary bg-secondary-subtle cursor-pointer";
  const banks = document.getElementById("banks");

  bankList.forEach((elemento) => {
    banks.innerHTML += `
        <div class='${style}' id='${elemento.CodigoInstitucion}'>${elemento.NombreInstitucion}</div>`;
  });
}

function saveDataLS(banksList) {
  localStorage.setItem("banks", JSON.stringify(banksList));
}
