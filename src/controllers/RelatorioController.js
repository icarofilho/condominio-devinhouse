import sequelize from "sequelize";
import Despesa from "../models/Despesa";
import Habitante from "../models/Habitante";
import { logger } from "../config/logger";
import { mesesDoAno } from "../utils/constantes";

module.exports = {
  async index(req, res) {
    try {
      const despesas = await Despesa.findAll({
        order: [
          ["mes", "ASC"],
          ["ano", "ASC"],
        ],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      let data = ``;
      if (despesas.length == 1) {
        data = `${mesesDoAno[despesas[0].mes - 1]}/${despesas[0].ano}`;
      } else {
        data = `${mesesDoAno[despesas[0].mes - 1]}/${despesas[0].ano} - ${
          mesesDoAno[despesas[despesas.length - 1].mes - 1]
        }/${despesas[despesas.length - 1].ano}`;
      }
      //! maior
      const habitantes = await Habitante.findAll()
      const nomeMaior = { nome: "", renda: 0 };

      habitantes.forEach(habitante => {
        if(!nomeMaior.nome){
          nomeMaior.nome = habitante.nome
          nomeMaior.renda = habitante.renda
        } else if ( habitante.renda > nomeMaior.renda){
          nomeMaior.nome = habitante.nome
          nomeMaior.renda = habitante.renda
        } 
      })
      
      //! Despesa
      const totalDespesas = await Despesa.sum("total");
      const totalReserva = await Despesa.sum("reserva");
      const totalExtra = await Despesa.sum("extra");
      const totalCaixa = await Despesa.sum("caixa");

      //! Soma todos os habitantes
      const totalRenda = await Habitante.sum("renda");

      const relatorio = {
        nome: "Condominio Dev",
        resumo: {
          periodo: data,
          entrada: totalReserva + totalDespesas,
          saida: totalDespesas + totalExtra,
          saldo: totalCaixa,
        },
        total_renda: totalRenda,
        maior_custo: `${nomeMaior.nome} -R$ ${nomeMaior.renda}`,
        demonstrativo: despesas,
      };
      return res.json({ relatorio });
    } catch (error) {
      logger.error(error.message);
      return res.status(400).json({ error: error.message });
    }
  },
};
