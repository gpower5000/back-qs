const dummyData = {
    GetCarrier: [
        {
            ruc: 20601050219,
            social_reazon: 'Grupo 2MYR S.A.C',
        },
        {
            ruc: 20154578954,
            social_reazon: 'Empresa de Prueba S.A.C',
        }
    ],
    GetGuideState: [
        { cod_state: 1, desc_state: 'REGISTRADO' },
        { cod_state: 2, desc_state: 'PROCESO' },
        { cod_state: 3, desc_state: 'ACEPTADO POR SUNAT' },
        { cod_state: 4, desc_state: 'PENDIENTE POR SUNAT' },
        { cod_state: 5, desc_state: 'RECHAZADO POR SUNAT' },
    ],
    GetGuideList: (nro_serie, nro_correlativo_from, nro_correlativo_to, ruc, nro_placa, cod_state, date_from, date_to, page, size) => {
      console.log({
        nro_serie, nro_correlativo_from, nro_correlativo_to, ruc, nro_placa, cod_state, date_from, date_to, page, size
      })
        const data = [
            { NRO_GUIA: '001-00001212', NRO_PLACA: '354-NYH', RUC: 20601050219,
              TRANSPORTISTA: 'Grupo 2MYR S.A.C', FECHA_EMISION: '2020-05-15',
              REMITENTE: 'SPSA PVEA SAN BORJA', DESTINATARIO: 'SPSA PVEA BARRANCA',
              PUNTO_PARTIDA: 'Manzana I-2 Urbanizacion San Borja',
              PUNTO_LLEGADA: 'JR. ZAVALA S/N. CDRA 1                  ',
              COD_ESTADO: 1, ESTADO: 'REGISTRADO', TOTAL_REGISTROS: 200,
            },
            { NRO_GUIA: '001-00002154', NRO_PLACA: 'AEF-717', RUC: 20154578954,
              TRANSPORTISTA: 'Empresa de Prueba S.A.C', FECHA_EMISION: '2020-05-21',
              REMITENTE: 'SPSA PVEA BREÑA', DESTINATARIO: 'SPSA PVEA BARRANCA',
              PUNTO_PARTIDA: 'Calle Juan Pablo Fernandini             ',
              PUNTO_LLEGADA: 'JR. ZAVALA S/N. CDRA 1                  ',
              COD_ESTADO: 5, ESTADO: 'RECHAZADO POR SUNAT', TOTAL_REGISTROS: 200,
            },
            { NRO_GUIA: '001-00002155', NRO_PLACA: 'F5U-597', RUC: 20601050219,
              TRANSPORTISTA: 'Grupo 2MYR S.A.C', FECHA_EMISION: '2020-05-30',
              REMITENTE: 'SPSA PVEA SULLANA', DESTINATARIO: 'SPSA PVEA TRUJILLO MANSICHE',
              PUNTO_PARTIDA: 'Calle La Mar    ',
              PUNTO_LLEGADA: 'Avenida España',
              COD_ESTADO: 4, ESTADO: 'PENDIENTE POR SUNAT', TOTAL_REGISTROS: 200,
            },
            { NRO_GUIA: '001-00002158', NRO_PLACA: 'CKN-364', RUC: 20601050219,
              TRANSPORTISTA: 'Grupo 2MYR S.A.C', FECHA_EMISION: '2020-06-01',
              REMITENTE: 'SPSA PVEA SULLANA', DESTINATARIO: 'SPSA PVEA TRUJILLO MANSICHE',
              PUNTO_PARTIDA: 'Calle La Mar    ',
              PUNTO_LLEGADA: 'Avenida España',
              COD_ESTADO: 2, ESTADO: 'PROCESO', TOTAL_REGISTROS: 200,
            },
            { NRO_GUIA: '001-00002160', NRO_PLACA: 'A1A-802', RUC: 20154578954,
              TRANSPORTISTA: 'Empresa de Prueba S.A.C', FECHA_EMISION: '2020-06-01',
              REMITENTE: 'SPSA PVEA SULLANA', DESTINATARIO: 'SPSA PVEA TRUJILLO MANSICHE',
              PUNTO_PARTIDA: 'Calle La Mar    ',
              PUNTO_LLEGADA: 'Avenida España',
              COD_ESTADO: 3, ESTADO: 'ACEPTADO POR SUNAT', TOTAL_REGISTROS: 200,
            },
            { NRO_GUIA: '001-00002161', NRO_PLACA: 'F5U-597', RUC: 20601050219,
              TRANSPORTISTA: 'Grupo 2MYR S.A.C', FECHA_EMISION: '2020-06-03',
              REMITENTE: 'SPSA PVEA SULLANA', DESTINATARIO: 'SPSA PVEA TRUJILLO MANSICHE',
              PUNTO_PARTIDA: 'Calle La Mar    ',
              PUNTO_LLEGADA: 'Avenida España',
              COD_ESTADO: 4, ESTADO: 'PENDIENTE POR SUNAT', TOTAL_REGISTROS: 200,
            },
            { NRO_GUIA: '001-00002162', NRO_PLACA: 'CKN-364', RUC: 20601050219,
              TRANSPORTISTA: 'Grupo 2MYR S.A.C', FECHA_EMISION: '2020-06-03',
              REMITENTE: 'SPSA PVEA SULLANA', DESTINATARIO: 'SPSA PVEA TRUJILLO MANSICHE',
              PUNTO_PARTIDA: 'Calle La Mar    ',
              PUNTO_LLEGADA: 'Avenida España',
              COD_ESTADO: 2, ESTADO: 'PROCESO', TOTAL_REGISTROS: 200,
            },
            { NRO_GUIA: '001-00002163', NRO_PLACA: 'A1A-802', RUC: 20154578954,
              TRANSPORTISTA: 'Empresa de Prueba S.A.C', FECHA_EMISION: '2020-06-03',
              REMITENTE: 'SPSA PVEA SULLANA', DESTINATARIO: 'SPSA PVEA TRUJILLO MANSICHE',
              PUNTO_PARTIDA: 'Calle La Mar    ',
              PUNTO_LLEGADA: 'Avenida España',
              COD_ESTADO: 3, ESTADO: 'ACEPTADO POR SUNAT', TOTAL_REGISTROS: 200,
            },
            { NRO_GUIA: '001-00002167', NRO_PLACA: 'A1A-970', RUC: 20154578954,
              TRANSPORTISTA: 'Empresa de Prueba S.A.C', FECHA_EMISION: '2020-06-04',
              REMITENTE: 'SPSA VIVANDA MONTERRICO', DESTINATARIO: 'SPSA PVEA BREÑA',
              PUNTO_PARTIDA: 'Av.Primavera S/N C.C Monterrico         ',
              PUNTO_LLEGADA: 'JR. ZAVALA S/N. CDRA 1                  ',
              COD_ESTADO: 3, ESTADO: 'ACEPTADO POR SUNAT', TOTAL_REGISTROS: 200,
            },
            { NRO_GUIA: '001-00002168', NRO_PLACA: 'A1A-970', RUC: 20154578954,
              TRANSPORTISTA: 'Empresa de Prueba S.A.C', FECHA_EMISION: '2020-06-04',
              REMITENTE: 'SPSA VIVANDA MONTERRICO', DESTINATARIO: 'SPSA PVEA BREÑA',
              PUNTO_PARTIDA: 'Av.Primavera S/N C.C Monterrico         ',
              PUNTO_LLEGADA: 'JR. ZAVALA S/N. CDRA 1                  ',
              COD_ESTADO: 1, ESTADO: 'REGISTRADO', TOTAL_REGISTROS: 200,
            },
            // { NRO_GUIA: '001-00002169', NRO_PLACA: 'ERM-002', ruc: 20154578954,
            //   TRANSPORTISTA: 'Empresa de Prueba S.A.C', FECHA_EMISION: '2020-06-04',
            //   REMITENTE: 'VIVANDA DESTINOS AL SABOR', DESTINATARIO: 'SPSA PVEA BREÑA',
            //   PUNTO_PARTIDA: 'Casa Prado Av 28 Julio 878              ',
            //   PUNTO_LLEGADA: 'JR. ZAVALA S/N. CDRA 1                  ',
            //   COD_ESTADO: 1, ESTADO: 'REGISTRADO', TOTAL_REGISTROS: 200,
            // },
            // { NRO_GUIA: '001-00002192', NRO_PLACA: 'A1A-950', ruc: 20601050219,
            //   TRANSPORTISTA: 'Grupo 2MYR S.A.C', FECHA_EMISION: '2020-06-08',
            //   REMITENTE: 'VIVANDA DESTINOS AL SABOR', DESTINATARIO: 'SPSA PVEA BREÑA',
            //   PUNTO_PARTIDA: 'Casa Prado Av 28 Julio 878              ',
            //   PUNTO_LLEGADA: 'JR. ZAVALA S/N. CDRA 1                  ',
            //   COD_ESTADO: 1, ESTADO: 'REGISTRADO',
            // }
        ];
        return data.filter( item => {
            let status = true;
            let serie = item.NRO_GUIA.split('-')[0].toLowerCase();
            let correlativo = parseInt(item.NRO_GUIA.split('-')[1]);
            console.log('>>> correlativo', correlativo)
            let nro_c_from  = nro_correlativo_from;
            let nro_c_to    = nro_correlativo_to;
            if (!serie.includes(nro_serie || '')) {
              status = false;
            }
            if (nro_c_to === '' || nro_c_to === null || nro_c_to === undefined) {
              nro_c_to = nro_c_from;
            }
            if (nro_c_from !== '' && nro_c_from !== null && nro_c_to !== undefined) {
              if (!(parseInt(nro_c_from) <= parseInt(correlativo) && parseInt(nro_c_to) >= parseInt(correlativo))) {
                status = false;
              }
            }
            if (page === 20) {
              status = false;
            }
            return status;
        }).slice(0,page*size);
    },
    GetGuideDetails: (nro_guia) => {
      const data = [
        { NRO_ITEM: 1, DESC_ITEM: 'Producto 1 Palmolive a', COD_ITEM: 'P0001', WEIGHT: '20', UNIDAD_MEDIDA: 'KG', CANTIDAD: 10, NRO_GUIA: '001-00001212' },
        { NRO_ITEM: 1, DESC_ITEM: 'Producto 1 Palmolive a', COD_ITEM: 'P0001', WEIGHT: '12', UNIDAD_MEDIDA: 'KG', CANTIDAD: 10 },
        { NRO_ITEM: 2, DESC_ITEM: 'Producto 2 Ace', COD_ITEM: 'P0002', WEIGHT: '15', UNIDAD_MEDIDA: 'KG', CANTIDAD: 20, NRO_GUIA: '001-00001212' },
        { NRO_ITEM: 2, DESC_ITEM: 'Producto 2 Ace', COD_ITEM: 'P0002', WEIGHT: '5',UNIDAD_MEDIDA: 'KG', CANTIDAD: 20 },
        { NRO_ITEM: 3, DESC_ITEM: 'Gloria Six Pack', COD_ITEM: 'P0003', WEIGHT: '25', UNIDAD_MEDIDA: 'UN', CANTIDAD: 100 },
        { NRO_ITEM: 4, DESC_ITEM: 'Laive', COD_ITEM: 'P0004', WEIGHT: '10', UNIDAD_MEDIDA: 'UN', CANTIDAD: 40 },
      ]
      let hasValue = false;
      return data.filter( item => {
        if (!!item.NRO_GUIA && item.NRO_GUIA === nro_guia) {
          hasValue = true;
          return true;
        } else if (!item.NRO_GUIA && !hasValue) {
          return true;
        } else return false;
      })
    }
}

exports.dummyData = dummyData;