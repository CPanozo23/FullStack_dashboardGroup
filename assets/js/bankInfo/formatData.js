export const formatDataBI = (datos, option) => {
  let data = [];
  let dataTitle = "";

  switch (option) {
    case 1:
      data = datos.map(
        (elemento) => elemento.data.Perfiles[0].Perfil.emp_mujereres_perm
      );
      dataTitle = "Mujeres";
      break;
    case 2:
      data = datos.map(
        (elemento) => elemento.data.Perfiles[0].Perfil.emp_hombres_perm
      );
      dataTitle = "Hombres";
      break;
    case 3:
      data = datos.map(
        (elemento) => elemento.data.Perfiles[0].Perfil.empleados
      );
      dataTitle = "Total";
      break;
  }

  return {
    title: dataTitle,
    values: data,
  };
};
